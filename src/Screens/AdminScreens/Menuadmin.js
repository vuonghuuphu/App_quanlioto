
import { createDrawerNavigator } from "@react-navigation/drawer";
import React,{useState,useEffect } from "react";
import { Text, TouchableOpacity, View,Image, Alert, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style_App from "../../Style";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";

import homeadmin from '../AdminScreens/Home';
import Admin_category from "./Screen_ad/Admin_category";
import Admin_product from "./Screen_ad/Admin_product";
import Admin_brand from "./Screen_ad/Admin_brand";
import Admin_news from "./Screen_ad/Admin_news";
import Admin_service from "./Screen_ad/Admin_services";
import Admin_account from "./Screen_ad/Admin_account";
import Admin_DK from "./Screen_ad/Admin_DK";
import Admin_DK_ls from "./Screen_ad/Admin_DK_ls";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

const Drawer = createDrawerNavigator();

function DrawerContentadmin(props) {

 const Logout = async() => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
  }
  props.navigation.replace("Menu")
  console.log('ok')
 }

  return (
<LinearGradient
colors={[ "white", "white","#0f7cb8"]}
style={{height:'100%'}}
>
    <SafeAreaView>
        {/* <View style={{flexDirection:'row',marginStart:10,marginTop:30,marginBottom:30}}>
         <Image
         source={require('../../Img/profile.png')}
        />
        <View style={{marginStart:15}}>
            <Text style={{fontWeight:'bold',fontSize:16}}>{dataitem.name}</Text>
        </View>
        </View> */}

        <TouchableOpacity style={{alignItems:'center',backgroundColor:'red',margin:10,marginBottom:20}}
        onPress={()=>Logout()}
        >
            <Text style={{padding:6,fontWeight:'bold',color:'white'}}>Đăng xuất</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems:'center',backgroundColor:'green',marginEnd:10,marginStart:10,marginBottom:20}}
        onPress={()=> props.navigation.replace("Menu")}
        >
            <Text  style={{padding:6,fontWeight:'bold',color:'white'}}>Chuyển sang giao diện người dùng</Text>
        </TouchableOpacity>

<View style={{marginTop:30,marginStart:10}}>


     
<TouchableOpacity style={{flexDirection:'row',marginBottom:40}}
        onPress={()=>props.navigation.navigate('Ad_DK')}
>
            <Image
            style={{width:35,height:35}}
            source={require('../../Img/driver.png')}
            />

            <Text style={{fontWeight:'bold',fontSize:16,marginTop:8,marginLeft:10}}>
            Lịch đặt lái thử
            </Text>
     </TouchableOpacity>

     <TouchableOpacity style={{flexDirection:'row',marginBottom:40}}
     onPress={()=>props.navigation.navigate('Ad_categories',{
      check:0,
    })}
     >
            <Image
            style={{width:35,height:35}}
            source={require('../../Img/categories.png')}
            />

            <Text style={{fontWeight:'bold',fontSize:16,marginTop:10,marginLeft:10}}>
               Quản lí danh mục sản phẩm
            </Text>
     </TouchableOpacity>

     <TouchableOpacity style={{flexDirection:'row',marginBottom:40}}
     onPress={()=>props.navigation.navigate('Ad_brand',{
      check:0,
    })}
     >
            <Image
            style={{width:35,height:35}}
            source={require('../../Img/trademark.png')}
            />

            <Text style={{fontWeight:'bold',fontSize:16,marginTop:10,marginLeft:10}}>
               Quản lí nhãn hiệu
            </Text>
     </TouchableOpacity>

     <TouchableOpacity style={{flexDirection:'row',marginBottom:40}}
     onPress={()=>props.navigation.navigate('Ad_product',{
      check:0,
    })}
     >
            <Image
            style={{width:35,height:35}}
            source={require('../../Img/car.png')}
            />

            <Text style={{fontWeight:'bold',fontSize:16,marginTop:10,marginLeft:10}}>
               Quản lí sản phẩm
            </Text>
     </TouchableOpacity>

     <TouchableOpacity style={{flexDirection:'row',marginBottom:40}}
     onPress={()=>props.navigation.navigate('Ad_news',{check : 0})}
     >
            <Image
            style={{width:35,height:35}}
            source={require('../../Img/billen.png')}
            />

            <Text style={{fontWeight:'bold',fontSize:16,marginTop:10,marginLeft:10}}>
            Quản lí tin tức
            </Text>
     </TouchableOpacity>

     <TouchableOpacity style={{flexDirection:'row',marginBottom:40}}
     onPress={()=>props.navigation.navigate('Ad_service',{check:1})}
     >
            <Image
            style={{width:35,height:35}}
            source={require('../../Img/service.png')}
            />

            <Text style={{fontWeight:'bold',fontSize:16,marginTop:10,marginLeft:10}}>
            Quản lí dịch vụ
            </Text>
     </TouchableOpacity>

     <TouchableOpacity style={{flexDirection:'row',marginBottom:40}}
     onPress={()=>props.navigation.navigate('Ad_account',{check : 0})}
     >
            <Image
            style={{width:35,height:35}}
            source={require('../../Img/user.png')}
            />

            <Text style={{fontWeight:'bold',fontSize:16,marginTop:10,marginLeft:10}}>
            Quản lí tài khoản
            </Text>
     </TouchableOpacity>

     <TouchableOpacity style={{flexDirection:'row',marginBottom:40}}
     onPress={()=>props.navigation.navigate('Ad_account',{check : 1})}
     >
            <Image
            style={{width:35,height:35}}
            source={require('../../Img/customer-service.png')}
            />

            <Text style={{fontWeight:'bold',fontSize:16,marginTop:10,marginLeft:10}}>
            Quản lí tài khoản Admin
            </Text>
     </TouchableOpacity>

     <TouchableOpacity style={{flexDirection:'row',marginBottom:40}}
     onPress={()=>props.navigation.navigate('Ad_DK_ls',{check : 1})}
     >
            <Image
            style={{width:35,height:35}}
            source={require('../../Img/hands.png')}
            />

            <Text style={{fontWeight:'bold',fontSize:16,marginTop:10,marginLeft:10}}>
            lịch sử lái thử
            </Text>
     </TouchableOpacity>

</View>
        
</SafeAreaView>  
</LinearGradient>
    
  );
}

export default function MenuAdmin() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContentadmin {...props} />}
      screenOptions
    >
      <Drawer.Screen
        name="screen"
        component={Admin_DK}
        options={{ title: "", headerShown: false }}
      />

      <Drawer.Screen
        name="screen2"
        component={Admin_DK}
        options={{ title: "", headerShown: false }}
      />

      <Drawer.Screen
        name="Ad_categories"
        component={Admin_category}
        options={{ title: "", headerShown: false }}
      />

<Drawer.Screen
        name="Ad_product"
        component={Admin_product}
        options={{ title: "", headerShown: false }}
      />
      <Drawer.Screen
        name="Ad_brand"
        component={Admin_brand}
        options={{ title: "", headerShown: false }}
      />
      <Drawer.Screen
        name="Ad_news"
        component={Admin_news}
        options={{ title: "", headerShown: false }}
      />
            <Drawer.Screen
        name="Ad_service"
        component={Admin_service}
        options={{ title: "", headerShown: false }}
      />
          <Drawer.Screen
        name="Ad_account"
        component={Admin_account}
        options={{ title: "", headerShown: false }}
      />
      <Drawer.Screen
        name="Ad_DK"
        component={Admin_DK}
        options={{ title: "", headerShown: false }}
      />

<Drawer.Screen
        name="Ad_DK_ls"
        component={Admin_DK_ls}
        options={{ title: "", headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
