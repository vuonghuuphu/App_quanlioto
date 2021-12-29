import React,{useEffect,useState} from "react";
import { View, Text, Image, TouchableOpacity ,FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style_App from "../Style";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function screencategories(props) {

const [cate_list, setcate_list] = useState([])

const gatcategories = async() =>{
    const response = await fetch(`${baseurl}/api/categories`);
    const json_categories = await response.json();
    console.log(json_categories)
    setcate_list(json_categories)
} 

useEffect(() => {
    gatcategories();
}, [])


  return (
    <SafeAreaView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            style={{ marginLeft: 10 ,width:30,height:30}}
            source={require("../Img/Backbtn.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "#0f7cb8",alignItems:'center' }}>
          <Text
            style={{
              padding: 10,
              color: "white",
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            Danh mục các dòng xe
          </Text>
        </View>
      <View style={{alignItems:'center'}}>
      <FlatList
            data={cate_list}
            style={{paddingBottom: 10}}
            keyExtractor={({ id }, index) => id}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
              
              onPress = {()=> props.navigation.navigate('Product',{
                id : item.id,
                })}>
              <View
                style={{
                    
                  alignItems: "center",borderWidth:1,borderColor:'grey',borderRadius:5,
                  margin: 5,
                }}
              >
                <Image
                  style={{
                    width: 225,
                    height: 150,
                  }}
                  source={{
                    uri: item.img,
                  }}
                />
                <Text style={{ fontSize: 15,fontWeight:'bold',color:'black'}}> {item.name}</Text>
              </View>
              </TouchableOpacity>
            )}
          />
      </View>

    </SafeAreaView>
  );
}
