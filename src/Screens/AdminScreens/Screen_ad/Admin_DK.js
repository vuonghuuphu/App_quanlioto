import React,{useState,useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import  AsyncStorage  from '@react-native-async-storage/async-storage';


// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";



export default function Admin_DK (props) {
  const [list, setlist] = useState([])
  let l = [];

  const getaccount = async() => {
      try {
        const res = await fetch(`${baseurl}/api/Testcars?id=0&phone=n`);
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

 
  

  useEffect(() => {
    getaccount();
}, []);

const deleteitem = async(id)=>{
  try {
      fetch(`${baseurl}/api/Testcars/${id}`, { method: 'DELETE' })
      props.navigation.replace('MenuAdmin')
  } catch (error) {
    console.log(error);
  }
};

const updatecategories = async(item) => {
try {
  const res = await fetch(`${baseurl}/api/Testcars/${item}`);
  const json = await res.json();
  if (json != "") {
    try {
      fetch(`${baseurl}/api/Testcars/${item}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify( 
    {
      id: item,
      nameKH: json.nameKH,
      namesp: json.namesp,
      datetest: json.datetest,
      phonenumber:`${json.phonenumber}`,
      statust: "Đã lái thử",
      img: json.img,
      idproduct : json.id,
      iduser : json.iduser
  }
    ),
    }); 
    props.navigation.replace('MenuAdmin')
    
  } catch (error) {
    console.log(error);
  }
  }
} catch (error) {
}
};

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Image style={{ marginLeft: 10 }} source={require("../../../Img/menuicon.png")} />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Image style={{ marginRight: 10 }} source={require("../../../Img/search.png")} />
          </TouchableOpacity>
        </View>
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
          Quản lí lịch đặt lái thử
        </Text>
      </View>

      <View>
        <ScrollView style={{marginBottom:300}}>
        <View>
            <View style={{ alignItems: "center" }}>
                {list.map((item,index)=>(
                  <View key={item.id}
                  style={{flexDirection:'row',marginTop:10,borderWidth:1,borderColor:'grey',width:460}}
                  >
                      <View style={{alignItems:'center'}}>
                    <Image
                    source={{uri : item.img}}
                    style={{width:150,height:80}}
                    />
                    <Text  style={{marginTop:10}}>mã sp: {item.idproduct}</Text>
                    </View>
                    <View style={{marginLeft:5}}>
                      <Text  style={{marginTop:2,marginBottom:5}}>sản phẩm: {item.namesp}</Text>
                      <Text  style={{marginTop:2,marginBottom:5}}>Ngày lái thử: {item.datetest}</Text>
                      <Text  style={{marginTop:2,marginBottom:5}}>Tên KH: {item.nameKH}</Text>
                      <Text  style={{marginTop:2,marginBottom:5}}>SDT: {item.phonenumber}</Text>
                    <View style={{marginLeft:5,flexDirection:'row'}}>
                      <TouchableOpacity style={{backgroundColor:'green',margin:10,alignItems:'center'}}
                      onPress={()=>updatecategories(item.id)}
                      >
                        <Text 
                        style={{color:'white',fontWeight:'bold',paddingLeft:10,paddingRight:10,paddingBottom:5,paddingTop:5}}
                        >
                          Đã lái thử</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{backgroundColor:'red',margin:10,alignItems:'center'}}
                      onPress={()=>deleteitem(item.id)}
                      >
                        <Text 
                        style={{color:'white',fontWeight:'bold',paddingLeft:10,paddingRight:10,paddingBottom:5,paddingTop:5}}
                        >
                         Hủy lịch</Text>
                      </TouchableOpacity>
                    </View>
                    </View>
                    
                  </View>
                ))}
            </View>
            </View>
          </ScrollView>
      </View>
    </SafeAreaView>
  );
}
