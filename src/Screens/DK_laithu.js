import React ,{useState,useEffect }from 'react';
import {View,Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import style_App from '../Style';
 
// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";


export default function  DK_laithu (props){
  const {check} = props.route.params;
  const {iduser} = props.route.params;
    const [name, setname] = useState("")
    const [image, setImage] = useState("");
    const [day, setday] = useState("")
    const [brand, setbrand] = useState("")
    const [categories, setcategories] = useState("")
    const [Adminaccount, setAdminaccount] = useState([])
    

    const [listcategories, setlistcategories] = useState([])
    const getcategories =async() => {
      try {
        const res = await fetch(`${baseurl}/api/Products/${check}`);
        const json = await res.json();
        if (json != "") {
        setname(json.name)
        setImage(json.img)
        setlistcategories(json)
        try {
          const resb = await fetch(`${baseurl}/api/brands/${json.id_brand}`);
          const jsonb = await resb.json();
          setbrand(jsonb)
        } catch (error) {
          console.log(error)
        }
        try {
          const resc = await fetch(`${baseurl}/api/Categories/${json.id_categories}`);
          const jsonc = await resc.json();
          setcategories(jsonc)
        } catch (error) {
          console.log(error)
        }
        try {
          const resc = await fetch(`${baseurl}/api/Users/${iduser}`);
          const jsonc = await resc.json();
          setAdminaccount(jsonc)
          console.log(jsonc)
        } catch (error) {
          console.log(error)
        }
        }
        console.log(json)
        // getaccount();
      } catch (error) {
        console.log(error)
      }
    }

//     const [Adminaccount, setAdminaccount] = useState([])
//     const getaccount = async() => {
//     try {
//       let data = await AsyncStorage.getItem('name');
//       let jsoncheck =  JSON.parse(data)
//       setAdminaccount(jsoncheck)
//       console.log(jsoncheck)
//     }
//      catch (error) {
//       console.log(error)
//     }
// }
    useEffect(() => {
      getcategories();
      // getaccount();
    }, [])
   
    const add_test = async (Adminaccount,listcategories) => {
      try {
          fetch(`${baseurl}/api/Testcars`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify( 
        {
          nameKH: Adminaccount.name,
          namesp: name,
          datetest: day,
          phonenumber:`${Adminaccount.phonenumber}`,
          statust: "chờ xác nhận",
          img: listcategories.img,
          idproduct : listcategories.id,
          iduser : iduser
      }
        ),
        }); 
        props.navigation.replace('Menu')
        
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
        
        <SafeAreaView style={{flex:1,backgroundColor:"white",justifyContent:"space-between"}}>
            <View>
                <TouchableOpacity
                onPress={()=> props.navigation.goBack()}
                >
                <Image
                style={{width:30,height:30,marginStart:10}}
                source={require('../Img/Backbtn.png')}
                />
                </TouchableOpacity>
                <View style={{ alignItems: "center", backgroundColor: "#0f7cb8" ,marginTop:10}}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          Đăng kí lái thử
        </Text>
      </View>
      <View>
      <Text style={{padding:10,fontWeight:'bold'}}>Thông tin khách hàng</Text>
        
        <View style={{marginLeft:10,marginRight:10,borderWidth:1}}>
        <Text style={{padding:10}}>Họ và tên: {Adminaccount.name}</Text> 
        <Text style={{padding:10}}>Số điện thoại: {Adminaccount.phonenumber}</Text>
        <Text style={{padding:10}}>Địa chỉ: {Adminaccount.address}</Text>
        <Text style={{padding:10}}>Email: {Adminaccount.email}</Text>
        </View>
        
        <Text style={{padding:10,fontWeight:'bold'}}>Thông tin sản phẩm</Text>
        
        <View style={{marginLeft:10,marginRight:10,borderWidth:1}}>
        <Text style={{padding:10}}>Tên sản phẩm: {name}</Text> 
        <Text style={{padding:10}}>Hãng: {brand.name}</Text>
        <Text style={{padding:10}}>Dòng xe: {categories.name}</Text>
        <View style={{alignItems:'center'}}>
              <Image source={{ uri: listcategories.img }} style={{ width: 400, height: 200,marginBottom:10}} />
        </View>
        </View>
        <View>
          
          <View style={{padding:10}}>
        <Text style={{padding:5}}>Nhập ngày muốn lái thử (ngày/tháng/năm):</Text>
        <TextInput style={{width:300,height:40,borderWidth:1,borderRadius:10,paddingStart:10,marginBottom:20,}}
                placeholder={"ngày/tháng/năm"}
                onChangeText={(text) => {
                  setday(text)
                }}
                /> 
          </View>

        </View>
      </View>
            <View style={{alignItems:"center"}}>
            
                <View style={{flexDirection:'row'}}>
                   
              
                
                </View>
            <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:10}}>
             
            <TouchableOpacity style={style_App.Login_btn}
            onPress={()=> add_test(Adminaccount,listcategories)}
            >
                <Text style={style_App.Login_txt_btn}>
                    Đăng kí
                </Text>
            </TouchableOpacity>
            
            </View>

            </View>
            </View>


            
        </SafeAreaView>
    );
}