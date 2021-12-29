import React ,{useState,useEffect }from 'react';
import {View,Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

import Logo from '../Img/Logo_autoapp.jpg';
import fingerprint from '../Img/fingerprint-scan.png'

import style_App from '../Style';
 
// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function  screenLogin (props){
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [isloading, setisloading] = useState(true);
    const [user, setuser] = useState([]);
    const [setItem, setsetItem] = useState([]);

    // const Load_item = async() =>{
    // try {
    //     let data = await AsyncStorage.getItem('name')
    //     setsetItem(JSON.parse(data));
    //     console.log(setItem.id);
    //     if(setItem != "") {
    //         props.navigation.navigate('Menu',{
    //             id_user : setItem.id
    //         });
    //     }
    // } catch (error) {
    //     alert("Khong lay duoc item");
    // }}

    const Login_User = async() => {
        try {
            const response = await fetch(`${baseurl}/api/Users?email=${Email}&pass=${Password}`);
            const json = await response.json();
            if(json != '' ){
                console.log(`!= null`)
            let getkey = await AsyncStorage.getItem('name');
            if (getkey == null) {
            try {
            const jsonValue = JSON.stringify(
            json
             )
             await AsyncStorage.setItem('name', jsonValue)
             console.log('add ok');
             props.navigation.replace('Menu',{iduser: json[0].iduser,}) 
            } catch (error) {
                console.log('add f');
            }
            }else{
            try {
             let getkey = await AsyncStorage.getItem('name');
             let data = JSON.parse(getkey);
             const jsonValue1 = JSON.stringify(json)
             await AsyncStorage.setItem('name', jsonValue1)
             console.log('add u ok');
            } catch (error) {
                console.log('add u f');
             }
            }
               props.navigation.replace('Menu') 
            }
            if(user == ''){
                console.log(" = null")
            }
        } catch (error) {
            console.error(error)
        }finally{
            setisloading(false);
        }
    }
    

    
    // useEffect(() => {
    //     Load_item(); 
    // }, []);
    
    return (
        
        <SafeAreaView style={{flex:1,backgroundColor:"white",justifyContent:"space-between"}}>
            <View>
                <Image
                style={{width:"100%",height:400,}}
                source={Logo}
                />
            <View style={{alignItems:"center"}}>


                <TextInput style={style_App.Login_input_box}
                placeholder={"Nhập Email"}
                onChangeText={(text) => {
                    setEmail(text)
                }}
                />

                <TextInput style={style_App.Login_input_box}
                placeholder={"Nhập mật khẩu"}
                secureTextEntry={true}
                autoFocus={true}
                onChangeText={(text)=> {
                    setPassword(text)
                }}
                />
            <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:10}}>
            <TouchableOpacity style={style_App.Login_btn}
            onPress={()=> Login_User()}
            >
                <Text style={style_App.Login_txt_btn}>
                    Đăng nhập
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:50,height:50}}>
                <Image
                style={{width:50,height:50}}
                source={fingerprint}
                />
            </TouchableOpacity>
            </View>

            </View>
            </View>

            <View style={{alignItems:"center", marginBottom:10}}>
                <Text style={{marginBottom:15}}>
                    Quên mật khẩu 
                </Text>
               <View style={{flexDirection:'row'}}>
            <Text>Bạn chưa có tài khoản</Text>
            <TouchableOpacity onPress={()=> props.navigation.navigate('register')}>
                 <Text style={{fontWeight:'bold',color:"blue",fontSize:15,marginLeft:6}}>
                    Đăng Kí
                </Text>
            </TouchableOpacity>
               
            </View> 
            </View>
            
        </SafeAreaView>
    );
}