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



export default function DK_laithujs (props) {
  const [list, setlist] = useState([])
  let l = [];

  const getaccount = async() => {
    try {
        let data = await AsyncStorage.getItem('name');
        const jsonl= JSON.parse(data)
        // setdataitem(JSON.parse(data))
        console.log(jsonl[0].id)
      try {
        const res = await fetch(`${baseurl}/api/Testcars?id=${jsonl[0].id}&phone=n`);
        const json = await res.json();
        if (json != null) {
          for (let i = 0; i < json.length; i++) {
           if (json[i].statust == "Đã lái thử") {
             l.push(json[i])
           }
          }
        }
        setlist(l);
      } catch (error) {
        console.log(error)
      }

    }catch (error) {
        console.log(error)
      }
    }
 
  

  useEffect(() => {
    getaccount();
}, []);


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
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image style={{ marginLeft: 10,width:30,height:30 }} source={require("../Img/Backbtn.png")} />
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
          Quản lí lịch sử lái thử
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
                    <Text  style={{marginTop:5}}>mã sp: {item.idproduct}</Text>
                    </View>
                    <View style={{marginLeft:5}}>
                      <Text  style={{marginTop:2,marginBottom:5}}>sản phẩm: {item.namesp}</Text>
                      <Text  style={{marginTop:2,marginBottom:5}}>Ngày lái thử: {item.datetest}</Text>
                      <Text  style={{marginTop:2,marginBottom:5}}>Tên KH: {item.nameKH}</Text>
                      <Text  style={{marginTop:2,marginBottom:5}}>SDT: {item.phonenumber}</Text>
                    <View style={{marginLeft:5,flexDirection:'row'}}>

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
