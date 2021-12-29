import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SliderBox } from "react-native-image-slider-box";

import star from "../Img/star.png";
import Like_dis from "../Img/heartdis.png";
import { ScrollView } from "react-native-gesture-handler";


// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function NoiBat(props) {
  const [isloading, setisloading] = useState(true);
  const [DataCategories, setDataCategories] = useState([]);

  const [Datapanelimg, setDatapanelimg] = useState([]);
  const [Datapanel, setDatapanel] = useState([]);

 const [DataProducts, setDataProducts] = useState([]);
 
  const getcategory = async () => {
    try {
      const response = await fetch(`${baseurl}/api/categories`);
      const json_categories = await response.json();
      // console.log(json_categories);
      setDataCategories(json_categories);
    } catch (error) {
      console.error(error);
    } finally {
      setisloading(false);
    }
  };

 
  const getproducts = async () => {
    try {
      const response = await fetch(`${baseurl}/api/Products`);
      const json_products = await response.json();
    setDataProducts(json_products);
    } catch (error) {
      console.error(error);
    } finally {
      setisloading(false);
    }
  };


  const getpanel = async () => {
        const response = await fetch(`${baseurl}/api/Panels`);
      const json = await response.json()
      let Imgdata = [];
      for (let i = 0; i < json.length; i++) {
        Imgdata.push(json[i].img);
      }
      if (Imgdata.length > 0){
        setDatapanelimg(Imgdata)
      }
  };

  useEffect(() => {
    getcategory();
    getproducts();
    getpanel();
  }, []);

  return (
    <ScrollView>
      <LinearGradient
        colors={[ "#0f7cb8","white", "white"]}
      >
   <View >
      
        <View>
            <View style={{paddingLeft:10,paddingRight:10,paddingTop:10,paddingBottom:10,flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize:18}}>
            Các dòng sản phẩm
          </Text>
          <TouchableOpacity
          onPress={()=>props.navigation.navigate("all_categories")}
          >
          <Text style={{ color: "white", fontWeight: "bold", fontSize:15}}>
           Xem thêm
          </Text>
          </TouchableOpacity>

          </View>
        </View>
        {isloading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={DataCategories}
            style={{paddingBottom: 10}}
            keyExtractor={({ id }, index) => id}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress = {()=> props.navigation.navigate('Product',{
                id : item.id,
                })}>
              <View
                style={{
                  alignItems: "center",
                  margin: 5,
                }}
              >
                <Image
                  style={{
                    width: 140,
                    height: 80,
                  }}
                  source={{
                    uri: item.img,
                  }}
                />
                <Text style={{ fontSize: 15,color:"white",}}> {item.name}</Text>
              </View>
              </TouchableOpacity>
            )}
          />
        )}
<View style={{backgroundColor:"black"}}>
<SliderBox
  images={Datapanelimg}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  sliderBoxHeight={300}
  autoplay
  circleLoop
  dotColor="white"
  inactiveDotColor="grey"
/>
</View>

      <View>

      <View style={{paddingLeft:10,paddingRight:10,paddingTop:30,flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{ color: "black", fontWeight: "bold", fontSize:18,paddingBottom:10}}>
            Sản phẩm nổi bật
          </Text>
          <Text style={{ color: "black", fontWeight: "bold", fontSize:15}}>
           Xem thêm
          </Text>
      </View>
      <View>
 
      </View>


      </View>

      {
        DataProducts.map((item1 , index) => (
          <View
          key={index}
          style={{
            backgroundColor:"white",
            margin: 10,
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 220,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={{
              uri: item1.img,
            }}
          />
          <Text style={{ fontSize: 16,fontWeight:"bold" }}> {item1.name}</Text>
        
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize: 16,color:'black'}}> Giá bán :</Text>
          <Text style={{ fontSize: 16,color:'red'}}> {item1.price}</Text>
          <Text style={{ fontSize: 16,color:'black'}}> vnd </Text>
          </View>
          
          <View style={{flexDirection:'row',paddingRight:50}}>
          </View>
        </View>
<View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{margin:20}}>
<View style={{flexDirection:'row'}}>
<Image
style={{width:20,height:20,marginRight:2}}
source={star}
/>
<Text>5/5</Text>
</View>
</View>

<View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
<TouchableOpacity>
<Image
style={{width:30,height:30,marginRight:30}}
source={Like_dis}
/>
</TouchableOpacity>
<TouchableOpacity style={{backgroundColor:'green',borderRadius:10}}
onPress={()=>props.navigation.push('Detail', {
  idproduct: item1.id,
  id_category: item1.id_categories,
  idproductpara : item1.id_brand,
  check_return : 0 ,
})}
>
<Text style={{paddingTop:10,paddingStart:20,paddingEnd:20,color:'white',fontWeight:'bold'}}>Xem thêm</Text>   
</TouchableOpacity>
</View>
</View>
</View>
        </View>

        ) )
      }

      </View>
    </LinearGradient>
    </ScrollView>
  );
}
