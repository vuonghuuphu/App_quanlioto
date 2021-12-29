import React,{useState,useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  StatusBar,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import style_App from "../Style";
import  AsyncStorage  from '@react-native-async-storage/async-storage';


// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";



export default function Fromaccount (props) {
    const [oldPassword, setoldPassword] = useState(null)
    const [Password, setPassword] = useState(null)
    const {check} = props.route.params;

    const updatecategories = async() => {
        try {
            let data = await AsyncStorage.getItem('name');
            let t = (JSON.parse(data))
            if (t != "") {
                        try {
          if (check != "") {
            fetch(`${baseurl}/api/users/${check}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: check,
                email: t[0].email,
                name: t[0].name,
                address: t[0].address,
                phonenumber: t[0].phonenumber,
                password: Password
            }),
          }); 
          props.navigation.replace('Menu')
          }
  Alert.alert('ok ok')
        } catch (error) {
          console.log(error);
        }
            }
          }
           catch (error) {
            console.log(error)
          }

  };

  return (
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
Đổi mật khẩu
</Text>
</View>
<View style={{alignItems:'center'}}>
<TextInput style={style_App.Login_input_box}
                placeholder={"Nhập mật khẩu cũ"}
                secureTextEntry={true}
                autoFocus={true}
                onChangeText={(text)=> {
                    setoldPassword(text)
                }}
                />
                <TextInput style={style_App.Login_input_box}
                placeholder={"Nhập mật khẩu mới"}
                secureTextEntry={true}
                autoFocus={true}
                onChangeText={(text)=> {
                    setPassword(text)
                }}
                />
   </View>              
               <View style={{margin:10}}>
                           <TouchableOpacity style={{backgroundColor:'green',alignItems:'center'}}
                           onPress={()=> updatecategories()}
                           >
                <Text style={{fontSize:16,padding:10,color:'white'}}>Đổi mật khẩu</Text>
            </TouchableOpacity> 
            </View>


    </SafeAreaView>
  );
}
