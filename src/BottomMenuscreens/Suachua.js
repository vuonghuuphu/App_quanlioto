import React,{useEffect,useState} from "react";
import {View,Text,Image} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";

const tab = createMaterialTopTabNavigator();
import Dagiao from '../ToptabScreens/bill_Dagiao';
import Chuagiao from '../ToptabScreens/bill_Chuagiao';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function SuaChua (props){
    const [News, setNews] = useState([]);
    const [isloading, setisloading] = useState(true);
    const getNews = async() =>{
        try {
            const res = await fetch(`${baseurl}/api/news`);
            const json = await res.json();
            console.log(json) 
            setNews(json)
        } catch (error) {
            console.log(error)
        }finally{
            setisloading(false)
        }

    }

    useEffect(() => {
        getNews();
      }, []);

    return(
        <View style={{paddingBottom:30}}>
    <LinearGradient
    colors={[ "#0f7cb8","#0f7cb8", "#0f7cb8"]}
    >
        <View style={{alignItems:'center'}}>
            <Text style={{
                color: 'white',
                padding:5,
                fontSize:18
            }}>
                Tin tức 
            </Text>
        </View>
    </LinearGradient>
        <ScrollView >

            {
                News.map((item , index) => (

                    <View
                    key={index}
                    style={{backgroundColor:"white",margin:10}}>
    <Image 
            style={{width:"100%",height:200}}
            source = {{uri : item.img}}/>
    <View>
            <View>
                <Text style={{fontWeight:'bold',fontSize:16}}> {item.name} </Text>
                <Text> {item.title} </Text>

                <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                    <Text style={{paddingTop:5,paddingBottom:5,paddingEnd:10}}>{item.created_at}</Text>
                <TouchableOpacity 
                onPress={()=>props.navigation.push("Newsdetail",{Id_news : item.id})}
                style={{backgroundColor:'green',marginEnd:20}}>  
                    <Text style={{color:'white',fontSize:15,paddingTop:5,paddingBottom:5,paddingEnd:15,paddingStart:15,}}> Xem thêm </Text>
                </TouchableOpacity> 
                </View>

            </View>
        </View>

</View>

                ))
            }

            
</ScrollView>

</View>

    );
}