import React ,{useState,useEffect }from 'react';
import {View,Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Logo from '../../../Img/Logo_autoapp.jpg';
import fingerprint from '../../../Img/fingerprint-scan.png'

import style_App from '../../../Style';
 
// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";


export default function  from_addbrand (props){
  const {check} = props.route.params;
    const [name, setname] = useState("")
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result.uri);
        
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };

    const addcategory = async() => {
        try {
            if (name != "") {
              fetch(`${baseurl}/api/brands`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name,
                img: image,
              }),
            }); 
            props.navigation.navigate('Ad_brand',{
              check:1,
            })
            }

          } catch (error) {
            console.log(error);
          }
    };

    const [listcategories, setlistcategories] = useState([])
    const getcategories =async() => {
      try {
        const res = await fetch(`${baseurl}/api/brands/${check}`);
        const json = await res.json();
        setname(json.name)
        setImage(json.img)
        setlistcategories(json)
        console.log(json)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getcategories();
    }, [])

  
    const updatecategories = async(idcategory) => {
      try {
        if (name != "") {
          fetch(`${baseurl}/api/brands/${check}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id : idcategory,
            name: name,
            img: image,
          }),
        }); 
        props.navigation.navigate('Ad_brand',{
          check:1,
        })
        }
Alert.alert('ok ok')
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
                source={require('../../../Img/Backbtn.png')}
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
          Thêm thương hiệu
        </Text>
      </View>
            <View style={{alignItems:"center"}}>
            {(check == 0) && 
                <TextInput style={{width:470,height:40,borderWidth:1,borderRadius:10,paddingStart:10,marginBottom:20,marginTop:20}}
                placeholder={"Nhập tên danh mục"}
                onChangeText={(text) => {
                    setname(text)
                }}
                />}
              {(check > 0) &&   
                <TextInput style={{width:470,height:40,borderWidth:1,borderRadius:10,paddingStart:10,marginBottom:20,marginTop:20}}
                placeholder={"Nhập tên danh mục"}
                onChangeText={(text) => {
                  setname(text)
                }}
                value={name}
                
                />}
                <View style={{flexDirection:'row'}}>
                    <View>
                <TouchableOpacity style={{backgroundColor:'green',marginEnd:20,borderRadius:20,
            paddingTop:8,paddingBottom:8,paddingLeft:20,paddingEnd:20   
            }}
            onPress={()=> pickImage()}
            >
                <Text style={style_App.Login_txt_btn}>
                    Thêm ảnh
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:'red',marginEnd:20,borderRadius:20,
            paddingTop:8,paddingBottom:8,paddingLeft:20,paddingEnd:20 ,marginTop:10  
            }}
            >
                <Text style={style_App.Login_txt_btn}>
                    Xóa ảnh
                </Text>
            </TouchableOpacity>
            
            </View>
                <View style={{borderWidth:1}}>
                {(check == 0) && 
                        <Image source={{ uri: image }} style={{ width: 330, height: 180,}} />
                }

                {(check > 0) && 
                        <Image source={{ uri: listcategories.img }} style={{ width: 330, height: 180,}} />
                }
                    </View>
                
                </View>
            <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:10}}>
            {(check == 0) && 
            <TouchableOpacity style={style_App.Login_btn}
            onPress={()=> addcategory()}
            >
                <Text style={style_App.Login_txt_btn}>
                    Thêm thương hiệu
                </Text>
            </TouchableOpacity>
            }
            {(check > 0) && 
            <TouchableOpacity style={style_App.Login_btn}
            onPress={()=> updatecategories(listcategories.id)}
            >
                <Text style={style_App.Login_txt_btn}>
                    Sửa thương hiệu
                </Text>
            </TouchableOpacity>
            }
            </View>

            </View>
            </View>


            
        </SafeAreaView>
    );
}