import React, { useState, useEffect, Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from 'react-native-snap-carousel';
import backicon from '../Img/Backbtn.png';
import filter from "../Img/filter.png";
import star from "../Img/star.png";
import Like_dis from "../Img/heartdis.png";
import cart from "../Img/add-to-cart.png";
import { set } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function SanPham(props) {
  const imgdata = [];
  const [isloadingba, setisloadingba] = useState(true);
  const [Databrand, setDatabrand] = useState([]);

  const getbrand = async () => {
    try {
      const response = await fetch(`${baseurl}/api/Panels`);
      const json_brands= await response.json();
      setDatabrand(json_brands);
      for (let i = 0; i <Databrand.length; i++) {
        imgdata.push(Databrand[i].img);
      }
      console.log(imgdata)
    } catch (error) {
      console.error(error);
    } finally {
      setisloadingba(false);
    }
  };

  useEffect(() => {
    getbrand();
  }, []);


  return (
    <View >

    <View>
    {isloadingba ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={Databrand}
            keyExtractor={({ id }, index) => index}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            sco
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress = {()=> props.navigation.navigate('Product',{
                id : item.id,
                
                })}>
              <View
                style={{
                  width:480,
                  height:300,
                  alignItems: "center",
                  backgroundColor:"white",
                }}
              >
                <Image
                  style={{
                    width:"100%",
                    height:300,
                  }}
                  source={{
                    uri: item.img,
                  }}
                />
                
              </View>
              </TouchableOpacity>
            )}
          />
        )}
    </View>
    {/* <ScrollView>
        {
          imgdata.map((img ,index)=>(
            <Image
              key = {index}
              source={{uri:img}}
              style={{width:"100%",height:600,resizeMode:'contain'}}
            />
          ))
        }
     </ScrollView> */}

{/* <FlatList
data={Databrand}
keyExtractor = {item => item.item}
horizontal
showsHorizontalScrollIndicator={false}
renderItem={({ item }) => (
  <TouchableOpacity
  onPress = {()=> props.navigation.navigate('Product',{
    id : item.id,
    
    })}>
  <View
    style={{
      width:480,
      height:300,
      alignItems: "center",
      backgroundColor:"white",
    }}
  >
    <Image
      style={{
        width:"100%",
        height:300,
      }}
      source={{
        uri: item.img,
      }}
    /> */}
    
  {/* </View>
  </TouchableOpacity>
)}
>

</FlatList> */}
    </View>
  );
}
