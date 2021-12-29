import React,{useState,useEffect} from "react";
import { View ,Text,Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style_App from "../Style";
import  AsyncStorage  from '@react-native-async-storage/async-storage';


export default function Account (props){

const [dataitem, setdataitem] = useState([]);
const Load_item = async() =>{
  try {
    let data = await AsyncStorage.getItem('name');
    setdataitem(JSON.parse(data))
    console.log(JSON.parse(data))
  }
   catch (error) {
    console.log(error)
  }
}

useEffect(() => {
    Load_item();
}, [])

    return(
        <SafeAreaView>
            
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>

                <TouchableOpacity onPress={()=> props.navigation.goBack()}> 
                    <Image
                    style={{marginLeft:10,width:30,height:30}}
                    source={require('../Img/Backbtn.png')}
                    />
                </TouchableOpacity> 
            </View>
            <View style={{ alignItems: "center", backgroundColor: "#0f7cb8" }}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            padding: 5,
          }}
        >
          Quản lí tài khoản
        </Text>
      </View>
      {dataitem != "" && 
       <View style={{padding:10}}>
                <Text style={{fontSize:16,marginBottom:10}}>
                    Họ và tên : {dataitem[0].name}
                </Text>
                <Text style={{fontSize:16,marginBottom:10}}>
                    Email : {dataitem[0].email}
                </Text>
                <Text style={{fontSize:16,marginBottom:10}}>
                    Số điện thoại : {dataitem[0].phonenumber}
                </Text>
                <Text style={{fontSize:16,marginBottom:10}}>
                   Địa chỉ : {dataitem[0].address}
                </Text>
           
            <View style={{alignItems:'center'}}>
                           <TouchableOpacity style={{backgroundColor:'green'}}
                           onPress={()=> props.navigation.navigate('account_from',{check : dataitem[0].id})}
                           >
                <Text style={{fontSize:16,padding:10,color:'white'}}>Đổi mật khẩu</Text>
            </TouchableOpacity> 
            </View>
             </View>
      }
           
            

        </SafeAreaView>
    );
}