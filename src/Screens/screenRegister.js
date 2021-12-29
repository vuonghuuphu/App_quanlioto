import React ,{useState}from 'react';
import {View,Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';

import Logo from '../Img/Logo_autoapp.jpg';
import fingerprint from '../Img/fingerprint-scan.png'

import style_App from '../Style';
 
// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function  screenregister (props){
    const [Checkbox, setCheckbox] = React.useState(false);

    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [Phonenumber, setPhonenumber] = useState('');
    const [Pass, setPass] = useState('');

    const adduser = async()=>{
        fetch('http://192.168.1.104:8109/api/Users', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    {
        email: Email,
        name: Name,
        address: Address,
        phonenumber: Phonenumber,
        password: Pass
      }
  )
});
Alert.alert("Đăng kí thành công")
    }

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
                placeholder={"Nhập Tên tài khoản"}
                onChangeText={(text) => {
                    setName(text)
                               }}
                />

                <TextInput style={style_App.Login_input_box}
                placeholder={"Nhập Địa chỉ"}
                onChangeText={(text) => {
                    setAddress(text)
                               }}
                />
                <TextInput style={style_App.Login_input_box}
                placeholder={"Nhập số điện thoại"}
                onChangeText={(text) => {
                    setPhonenumber(text)
                               }}
                />
                <TextInput style={style_App.Login_input_box}
                placeholder={"Nhập mật khẩu"}
                secureTextEntry={true}
                autoFocus={true}
                onChangeText={(text) => {
                    setPass(text)
                               }}
                />
                <TextInput style={style_App.Login_input_box}
                placeholder={"Nhập lại mật khẩu"}
                secureTextEntry={true}
                autoFocus={true}
                onChangeText={(text) => {
                    setPass(text)
                               }}
                />

            <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:10}}>
            <TouchableOpacity style={style_App.Login_btn}>
                <Text style={style_App.Login_txt_btn} onPress={()=> adduser()}>
                    Đăng kí
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={style_App.Login_btn}
            onPress={()=>props.navigation.navigate('Login')}
            >
                <Text style={style_App.Login_txt_btn}>
                    Đăng nhập
                </Text>
            </TouchableOpacity>

            </View>

            </View>
            </View>
            
        </SafeAreaView>
    );
}