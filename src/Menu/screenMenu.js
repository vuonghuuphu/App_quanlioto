
import { createDrawerNavigator } from "@react-navigation/drawer";
import React,{useState,useEffect } from "react";
import { Text, TouchableOpacity, View,Image, Alert, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style_App from "../Style";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";

import iconuser from "../Img/profile.png"
import Star from "../Img/star.png"
import BottomMenu from "../BottomMenuscreens/screenBottomMenu";
import screenLogin from "../Screens/screenLogin";
import MenuAdmin from "../Screens/AdminScreens/Menuadmin";
import Account from "../Screens/Account";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  const [dataitemadmin, setdataitemadmin] = useState([]);
  const [dataitem, setdataitem] = useState([]);
  const Load_item = async() =>{
    try {
      let data = await AsyncStorage.getItem('name');
      setdataitem(JSON.parse(data))
      //console.log(dataitem)
    }
     catch (error) {
      console.log(error)
    }
  }

  const [Adminaccount, setAdminaccount] = useState([])
  const getcheckadmin = async() => {

  try {
    let data = await AsyncStorage.getItem('name');
    let jsoncheck =  JSON.parse(data)
   try {
    const res = await fetch(`${baseurl}/api/CheckAdmins?id=${jsoncheck[0].id}`)
    const json = await res.json();
    if (json != null) {
      setAdminaccount(json)
    }
    
    } catch (error) {
      console.log(error)
    }
  }
   catch (error) {
    console.log(error)
  }
 
  }


    useEffect(() => {
      Load_item(); 
      getcheckadmin();
  }, []);

 const Logout = async() => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
  }
  props.navigation.replace("Menu",{idcategories : 1})
  console.log('ok')
 }



  return (
            <LinearGradient
        colors={[ "#0f7cb8","#0f7cb8", "white"]}
      >
        <View  style={{height:"100%"}}>

      <View style={{ marginTop:40 }}>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingStart:10,paddingEnd:10,marginBottom:30}}>

        {(dataitem == null) && 
        <TouchableOpacity 
        onPress={()=> props.navigation.push('Login')}
        style={{backgroundColor:'green'}}
        >
        <Text style={{color:'white',fontWeight:'bold',paddingTop:9,paddingEnd:35,paddingStart:35}} >Dang nhap</Text>
        </TouchableOpacity>
        }
        
        {(dataitem != null) && 
        <TouchableOpacity 
        onPress={() => Logout()}
        style={{backgroundColor:'red'}}
        >
        <Text style={{color:'white',fontWeight:'bold',paddingTop:9,paddingEnd:35,paddingStart:35}} >Dang xuat</Text>
        </TouchableOpacity>
        }

        <TouchableOpacity 
        onPress={()=> props.navigation.closeDrawer()}
        >
        <Image
        style={{height:20,width:20,margin:10}}
        source={require("../Img/close.png")}
        />
        </TouchableOpacity>
        
        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate("NoiBat")}>
            <View style={style_App.Menu_Title}>
                <Image
                style={{width:30,height:30}}
                source={Star}/>
                <Text style={style_App.Menu_Title_text}>Trang chủ</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("Suachua")}>
            <View style={style_App.Menu_Title}>
                <Image 
                style={{width:30,height:30}}
                source={require("../Img/billen.png")}/>
                <Text style={style_App.Menu_Title_text}>Tin tức </Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("Thongbao")}>
            <View style={style_App.Menu_Title}>
                <Image 
                style={{width:30,height:30}}
                source={require("../Img/settings.png")}/>
                <Text style={style_App.Menu_Title_text}>Dịch vụ</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("Sosanh")}>
            <View style={style_App.Menu_Title}>
                <Image
                style={{width:30,height:30}}
                source={require("../Img/notification.png")}/>
                <Text style={style_App.Menu_Title_text}>Lịch đăng kí lái thử</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate("DK_laithuls")}>
            <View style={style_App.Menu_Title}>
                <Image
                style={{width:30,height:30}}
                source={require("../Img/driver.png")}/>
                <Text style={style_App.Menu_Title_text}>Lịch sử lái thử</Text>
            </View>
        </TouchableOpacity>
      </View>

      <View>
            <View style={{borderTopWidth:1}}>

        {(dataitem != "") && 
                    <TouchableOpacity onPress={() => props.navigation.navigate("account")}>
            <View style={style_App.Menu_Title}>
                <Image 
                style={{width:30,height:30}}
                source={require("../Img/user_infor.png")}/>
                <Text style={style_App.Menu_Title_text}>Thông tin tài khoản</Text>
            </View>
        </TouchableOpacity>
        }

        <TouchableOpacity onPress={() => Logout()}>
            <View style={style_App.Menu_Title}>
                <Image 
                style={{width:30,height:30}}
                source={require("../Img/information.png")}/>
                <Text style={style_App.Menu_Title_text}>Trợ giúp</Text>
            </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => Logout()}>
            <View style={style_App.Menu_Title}>
                <Image 
                style={{width:30,height:30}}
                source={require("../Img/shop.png")}/>
                <Text style={style_App.Menu_Title_text}>Giới thiệu về chúng tôi</Text>
            </View>
        </TouchableOpacity>

        {(Adminaccount != "") && 
        <TouchableOpacity 
        onPress={()=> props.navigation.replace('MenuAdmin')}
        style={{backgroundColor:'red',marginTop:30}}
        >
        <Text style={{color:'white',fontWeight:'bold',paddingTop:9,paddingBottom:9,paddingEnd:35,paddingStart:35}} >Admin</Text>
        </TouchableOpacity>
        }
            </View>
      </View>
      </View>

      </LinearGradient>
  );
}

export default function MenuApp() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions
    >
      <Drawer.Screen
        name="screen"
        component={BottomMenu}
        options={{ title: "", headerShown: false }}
      />

      <Drawer.Screen
        name="screen2"
        component={screenLogin}
        options={{ title: "", headerShown: false }}
      />

      <Drawer.Screen
        name="Login"
        component={screenLogin}
        options={{ title: "", headerShown: false }}
      />

<Drawer.Screen
        name="MenuAdmin"
        component={MenuAdmin}
        options={{ title: "", headerShown: false }}
      />
      <Drawer.Screen
        name="account"
        component={Account}
        options={{ title: "", headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
