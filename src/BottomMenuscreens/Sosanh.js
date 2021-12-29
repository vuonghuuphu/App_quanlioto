import React,{useState,useEffect} from "react";
import {
    ActivityIndicator,
    FlatList,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
  } from "react-native";
  import{CheckBox} from 'react-native-check-box';

import  AsyncStorage  from '@react-native-async-storage/async-storage';

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";



export default function SoSanh (props){
  const {check} = props.route.params;
  const [list, setlist] = useState([])
  let c = check;

  const getaccount = async() => {
    let l =[];
  try {
    let data = await AsyncStorage.getItem('name');
    let jsoncheck =  JSON.parse(data)
    console.log(jsoncheck[0].id)

    if (jsoncheck[0].id > 0) {

        try {
          const res = await fetch(`${baseurl}/api/Testcars?id=${jsoncheck[0].id}&phone=n`);
          const json = await res.json();
          if (json != null) {
            for (let i = 0; i < json.length; i++) {
             if (json[i].statust == "chờ xác nhận") {
               l.push(json[i])
             }
            }
          }
          setlist(l);
        } catch (error) {
          console.log(error)
        }
    }
  }
   catch (error) {
    console.log(error)
  }
 
  }

  useEffect(() => {
    getaccount();
}, []);

const deleteitem = async(id)=>{
  try {
      fetch(`${baseurl}/api/Testcars/${id}`, { method: 'DELETE' })
      props.navigation.replace('Menu')
  } catch (error) {
    console.log(error);
  }
};



// if (c != 0) {
//   getaccount();
//    c = 0;
// }
    return(
        <View>
          <View style={{alignItems:'center',backgroundColor:"#0f7cb8"}}>
            <Text style={{color:'white',fontSize:16,padding:10}}>Lịch đăng kí lái thử của bạn {check}</Text>
          </View>

            <View>
            <View style={{ alignItems: "center" }}>
                {list.map((item,index)=>(
                  <View key={item.id}
                  style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,borderWidth:1,borderColor:'grey',width:460}}
                  >
                    <Image
                    source={{uri : item.img}}
                    style={{width:150,height:80}}
                    />
                    <View style={{marginLeft:5}}>
                      <Text  style={{marginTop:2,marginBottom:5}}>sản phẩm: {item.namesp}</Text>
                      <Text  style={{marginTop:2,marginBottom:5}}>Ngày lái thử: {item.datetest}</Text>
                      <Text  style={{marginTop:2,marginBottom:5}}>Trạng thái: {item.statust}</Text>
                    </View>
                    <View style={{marginLeft:5}}>
                      <TouchableOpacity style={{backgroundColor:'red',margin:10}}
                      onPress={()=>deleteitem(item.id)}
                      >
                        <Text 
                        style={{color:'white',fontWeight:'bold',paddingLeft:10,paddingRight:10,paddingBottom:5,paddingTop:5}}
                        >
                          Hủy</Text>
                      </TouchableOpacity>
                    </View>
                    
                    
                  </View>
                ))}
            </View>
            </View>
        </View>
    );
}