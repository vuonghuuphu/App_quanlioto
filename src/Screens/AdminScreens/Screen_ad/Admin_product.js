import React,{useState,useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  StatusBar,
} from "react-native";


// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function Admin_product(props) {

  const [listcategories, setlistcategories] = useState([])
  const getcategories = async() => {
    try {
      const res = await fetch(`${baseurl}/api/products`);
      const json = await res.json();
      setlistcategories(json)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getcategories();
  }, [])
  const {check} = props.route.params;
  if(check!=0){
    getcategories();
  }

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
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Image style={{ marginLeft: 10 }} source={require("../../../Img/menuicon.png")} />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Image style={{ marginRight: 10 }} source={require("../../../Img/search.png")} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ alignItems: "center", backgroundColor: "#0f7cb8" }}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            padding: 5,
          }}
        >
          Quản lí sản phẩm
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity
        onPress={() => props.navigation.push('product_from',{check : 0})}
          style={{
            backgroundColor: "green",
            width: 170,
            alignItems: "center",
            margin: 15,
          }}
        >
          <Text style={{ padding: 8, color: "white", fontWeight: "bold" }}>
            + Thêm sản phẩm mới
          </Text>
        </TouchableOpacity>
      </View>

      <View>
          {
            listcategories.map((item,index)=>(
              <View 
              style={{padding:6,flexDirection:'row'}}
              key={item.id}
              >
                <Image
                style={{width:180,height:100}}
                 source={{uri : item.img}}
                 />  

              <View style={{marginStart:10, justifyContent:"space-around"}}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>{item.name}</Text>
                   <Text style={{fontSize:16,fontWeight:'bold'}}>Giá bán: {item.price}</Text>
                 

                 <TouchableOpacity style={{marginTop:5,width:150,alignItems:'center'}}
                 onPress={()=>props.navigation.push('productdetail_ad',{
                   idcategories : item.id,
                   check:0,
                 })}
                 >
                   <Text style={{fontWeight:'bold',fontSize:15,padding:8,backgroundColor:'#0f7cb8',color:'white'}}>Xem thêm</Text>
                 </TouchableOpacity>
</View>       
              </View>
            )
            )
          }
      </View>
    </SafeAreaView>
  );
}
