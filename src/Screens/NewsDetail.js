import React,{useEffect,useState} from "react";
import {View,Text, Image,ActivityIndicator,FlatList, TouchableOpacity} from 'react-native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView } from "react-native-gesture-handler";

const tab = createMaterialTopTabNavigator();

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function NewDetail (props){
    const [News, setNews] = useState([]);
    const getNews = async() =>{
        const { Id_news } = props.route.params;
        try {
            const res = await fetch(`${baseurl}/api/news/${Id_news}`);
            const json = await res.json();
            console.log(json) 
            setNews(json)
        } catch (error) {
            console.log(error)
        }
    }

    const [isloading, setisloading] = useState(true);
    const [isnew, setisnew] = useState([])
    const getothernew = async () => {
        try {
          const response = await fetch(`${baseurl}/api/News`);
          const json = await response.json();
          setisnew(json);
        } catch (error) {
          console.error(error);
        } finally {
          setisloading(false);
        }
      };

    useEffect(() => {
        getNews();
        getothernew();
      }, []);

    return(
        <ScrollView>
     <View style={{paddingTop:30,marginStart:5,marginEnd:5}}>
       <TouchableOpacity
       onPress={()=>props.navigation.goBack()}
       >
            <Image
            style={{width:25,height:25,marginLeft:10,marginBottom:10}}
            source={require('../Img/Backbtn.png')}
            />
       </TouchableOpacity>

         <View>
         <Text style={{fontWeight:'bold',fontSize:18}}>{News.name}</Text>
         <View style={{alignItems:'flex-end'}}>
            <Text style={{alignItems:'flex-end'}}>{News.created_at}</Text> 
         </View>
         
         <Image
         style={{width:"100%",height:250,marginTop:10,marginBottom:10}}
          source={{uri:News.img}}
         />
         <Text style={{fontWeight:'bold',fontSize:16,marginBottom:30}}>{News.title}</Text>

         <Text style={{fontSize:16}}>{News.body}</Text>
         </View>
         
         <View>
             <View style={{alignItems:'center',backgroundColor:'#0f7cb8',marginTop:20}}>
                 <Text style={{padding:8,color:'white',fontSize:16}}>Tin tức khác</Text>
             </View>
             {isloading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={isnew}
            keyExtractor={({ id }, index) => id}
            horizontal={true}
            renderItem={({ item }) => (
              <View
                style={{
                    width:250,
                  alignItems: "center",
                  backgroundColor:"white",
                  borderWidth: 1,
                  borderRadius: 10,
                  margin:10,
                }}
              >
                <Image
                  style={{
                    width: 250,
                    height: 100,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  source={{
                    uri: item.img,
                  }}
                />
                <Text style={{ fontSize: 15 }}> {item.name}</Text>
              </View>
            )}
          />
        )}


         </View>

     </View>
     </ScrollView>
    );
}