import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image,View,TouchableOpacity,Text } from "react-native";

const Tab = createBottomTabNavigator();

import NoiBat from "../BottomMenuscreens/Noibat";
import SoSanh from "../BottomMenuscreens/Sosanh";
import SanPham from "../BottomMenuscreens/SanPham";
import ThongBao from "../BottomMenuscreens/Thongbao";
import Suachua from "../BottomMenuscreens/Suachua";
import { SafeAreaView } from "react-native-safe-area-context";

import search from "../Img/search.png"
import iconmenu from '../Img/menuicon.png'
import Product from "../Screens/Product";

function Header_App(props){
  return(
<SafeAreaView>
            
            <View style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:10,paddingTop:10}}>
    
                <TouchableOpacity onPress={()=> props.navigation.openDrawer()}> 
                    <Image
                    style={{marginLeft:10}}
                    source={iconmenu}
                    />
                </TouchableOpacity> 
    <View>
      <TouchableOpacity 
      style={{marginEnd:10,backgroundColor:'red',borderRadius:10}}
      onPress={()=> props.navigation.navigate('DK_laithuls')}>   
                    <Text style ={{color:'white',fontWeight:'bold',paddingLeft:15,paddingEnd:15,paddingTop:5,paddingBottom:5}}>Dòng xe đã lái thử</Text>
                </TouchableOpacity>
    </View>
                
            </View>
        </SafeAreaView>
        );
}

export default function BottomMenu(){
  return(
<Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "NoiBat") {
            iconName = focused
              ? require("../Img/star_en.png")
              : require("../Img/star_dis.png");
          } else if (route.name === "Sanpham") {
            iconName = focused
              ? require("../Img/car.png")
              : require("../Img/car_dis.png");
          } else if (route.name === "Sosanh") {
            iconName = focused
              ? require("../Img/notification.png")
              : require("../Img/notification_dis.png");
          } else if (route.name === "Suachua") {
            iconName = focused
              ? require("../Img/billen.png")
              : require("../Img/bill.png");
          } else if (route.name === "Thongbao") {
            iconName = focused
              ? require("../Img/settings.png")
              : require("../Img/settings_dis.png");
          }

          return <Image source={iconName} style={{ width: 22, height: 22 }} />;
        },
      })}
    >
      <Tab.Screen
        name="NoiBat"
        component={NoiBat}
        options={{
          tabBarShowLabel: false,
          title: "Nổi bật",
          header: (props) => <Header_App {...props} />,
        }}
      />

      <Tab.Screen
        name="Suachua"
        component={Suachua}
        options={{
          title: "Sửa chữa",
          tabBarShowLabel: false,
          header: (props) => <Header_App {...props} />,
        }}
      />
      <Tab.Screen
        name="Thongbao"
        component={ThongBao}
        options={{
          title: "Thông báo",
          tabBarShowLabel: false,
          header: (props) => <Header_App {...props} />,
        }}
      />
      
      <Tab.Screen
        name="Sosanh"
        component={SoSanh}
        initialParams={{ Check_pramas: 0 }}
        options={{
          tabBarShowLabel: false,
          title: "So sánh",
          header: (props) => <Header_App {...props} />,
        }}
      />
    </Tab.Navigator>
    );
}