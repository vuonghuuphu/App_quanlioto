import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";


export default function ThongBao(props) {
  const [Service, setService] = useState([]);
  const getservicelist = async () => {
    const res = await fetch(`${baseurl}/api/services`);
    const json = await res.json();
    setService(json);
  };

  const [useritem, setuseritem] = useState([])
  const loaduser = async() => {
    try {
      let data = await AsyncStorage.getItem('name');
      setuseritem(JSON.parse(data))
      console.log(useritem[0].name)
      
    } catch (error) {
      console.log(error)
    }
  }

  const addService = async(iduser,idservice) => {
    console.log(iduser),
    console.log(idservice)
    try {
      console.log("Dang add vao")
      fetch(`${baseurl}/api/oderServices`,{
        method:'POST',
        headers:{
         Accept: 'application/json',
         'Content-Type': 'application/json'
        },
        body:JSON.stringify(
          {
            iduser: iduser,
            idservice: idservice,
            status: 1
          }
        )
      })
    } catch (error) {
      console.log("khong add dc vao bill");
    }
  }



  useEffect(() => {
    getservicelist();
    loaduser();
  }, []);

  return (
    <ScrollView>
      <LinearGradient colors={["#0f7cb8", "white", "white"]}>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18,padding:10}}>
              Dịch vụ
            </Text>
          </View>

          <View>
            {Service.map((item, index) => (
              <View key={index}
              style={{margin:10,borderRadius:10,borderWidth:1}}>
                <Image
                  style={{ width: "100%", height: 260,borderTopLeftRadius:10,borderTopRightRadius:10}}
                  source={{ uri: item.img }}
                />

                <View>
                  <View style={{ marginEnd: 20, marginLeft: 20 ,marginBottom:10,marginTop:10}}>
                    <View>
                      <Text style={{fontSize:16, fontWeight:'bold',marginBottom:10}}>{item.name}</Text>
                    </View>

                    <TouchableOpacity style={{backgroundColor:'#0f7cb8',alignItems:'center',padding:10,borderRadius:10}}
                    onPress={()=>addService(useritem[0].id,item.id)}
                    >
                      <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Liên hệ</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
