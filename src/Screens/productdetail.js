import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import star from "../Img/star.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import YoutubePlayer from "react-native-youtube-iframe";
import backicon from "../Img/Backbtn.png";

import search from "../Img/search.png";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function productdetail(props) {

  const [isloading, setisloading] = useState(true);
  const [Data, setData] = useState([]);
  const getdetail = async () => {
    const { idproduct } = props.route.params;
    try {
      const response = await fetch(`${baseurl}/api/Products/${idproduct}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setisloading(false);
    }
  };

  const [Datavideo, setDatavideo] = useState("");
  const getvideo = async () => {
    const { idproduct } = props.route.params;
    try {
      const response = await fetch(
        `${baseurl}/api/Videoproducts?id=${idproduct}`
      );
      const json = await response.json();
        setDatavideo(json);
      console.log(json)
    } catch (error) {
      console.error(error);
    } 
  };

  const [isloadingparameter, setisloadingparameter] = useState(true);
  const [Dataparameter, setDataparameter] = useState([]);
  const getparameter = async () => {
    const { idproduct } = props.route.params;
    try {
      console.log(idproduct);
      const response = await fetch(
        `${baseurl}/api/Parameters?id=${idproduct}`
      );
      const json = await response.json();
      setDataparameter(json);
    } catch (error) {
      console.error(error);
    } finally {
      setisloadingparameter(false);
    }
  };

  const [isloadingcategory, setisloadingcategory] = useState(true);
  const [Datacategory, setDatacategory] = useState([]);
  const getcategory = async () => {
    const { id_category } = props.route.params;
    try {
      const response_id = await fetch(
        `${baseurl}/api/categories/${id_category}`
      );
      const json = await response_id.json();
      setDatacategory(json);
    } catch (error) {
      console.error(error);
    } finally {
      setisloadingcategory(false);
    }
  };

  const [isloadingproduct, setisloadingproduct] = useState(true);
  const [Dataproduct, setDataproduct] = useState([]);
  const getproduct = async () => {
    try {
      const response = await fetch(`${baseurl}/api/Products`);
      const json = await response.json();
      setDataproduct(json);
    } catch (error) {
      console.error(error);
    } finally {
      setisloadingproduct(false);
    }
  };

  const [isloadingimg, setisloadingimg] = useState(true);
  const [Imgdata, setImgdata] = useState([]);
  const [Imgdatalist, setImgdatalist] = useState([]);
  const getIMG = async () => {
    const imgdata = [];
    const { idproduct } = props.route.params;
    try {
      const response = await fetch(
        `${baseurl}/api/ImgProducts?idProduct=${idproduct}`
      );
      const json_img = await response.json();
      setImgdata(json_img);
      setImgdatalist(imgdata);
    } catch (error) {
      console.error(error);
    } finally {
      setisloadingimg(false);
    }
  };

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const [Adminaccount, setAdminaccount] = useState([])
  const getaccount = async() => {

  try {
    let data = await AsyncStorage.getItem('name');
    let jsoncheck =  JSON.parse(data)
    setAdminaccount(jsoncheck)
  }
   catch (error) {
    console.log(error)
  }
 
  }

  useEffect(() => {
    getparameter();
    getdetail();
    getcategory();
    getproduct();
    getIMG();
    getaccount();
    getvideo();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ justifyContent: "space-between", paddingBottom: 150 }}>
        <View>
          <ScrollView>
            <View>
              <View>
                {isloadingimg ? (
                  <ActivityIndicator />
                ) : (
                  <FlatList
                    data={Imgdata}
                    keyExtractor={({ id }, index) => index}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate("Noibat")}
                      >
                        <View
                          style={{
                            width: 480,
                            height: 320,
                            alignItems: "center",
                            backgroundColor: "white",
                          }}
                        >
                          <Image
                            style={{
                              width: "100%",
                              height: 320,
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

              <View style={{ position: "absolute", flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 10,
                  }}
                >
                  <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={backicon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                {Data.name}{" "}
              </Text>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18 }}>Giá bán : {Datavideo.linkvideo}</Text>
                <Text style={{ color: "red", fontSize: 18 }}>
                  {" "}
                  {Data.price}{" "}
                </Text>
                <Text style={{ fontSize: 15 }}>vnd</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18 }}>Dòng sản phẩm : </Text>
                <Text style={{ fontSize: 18 }}> {Datacategory.name} </Text>
              </View>

              <View style={{ flexDirection: "row", marginTop: 12 }}>
                <Text style={{ fontSize: 17, padding: 5, fontWeight: "bold" }}>
                  Thông số kĩ thuật :{" "}
                </Text>
              </View>
              <View style={{ marginLeft: 10 }}>
              {Dataparameter.map((item,index)=>( 
        <View key={item.id} style={{borderWidth:1,margin:10}}>
        <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>Kích thước</Text>
          <Text style={{padding:5,width:"80%"}}>{item.size}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>trọng lượng</Text>
          <Text style={{padding:5,width:"80%"}}>{item.weight}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>Tốc độ tối đa</Text>
          <Text style={{padding:5,width:"80%"}}>{item.acceleration}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>Tăng tốc</Text>
          <Text style={{padding:5,width:"80%"}}>{item.acceleration}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>mô đen xoắn cự đại</Text>
          <Text style={{padding:5,width:"80%"}}>{item.maximumtorque}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>Công xuất tối đa</Text>
          <Text style={{padding:5,width:"80%"}}>{item.maximumPower}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>Động cơ</Text>
          <Text style={{padding:5,width:"80%"}}>{item.engine}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>Nhiên liệu</Text>
          <Text style={{padding:5,width:"80%"}}>{item.fuel}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>Dung tích bình xăng</Text>
          <Text style={{padding:5,width:"80%"}}>{item.fuelTankCapacity}</Text>
          </View>
        </View>
         ))}
              </View>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: "#0f7cb8",
                  marginRight: 5,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    paddingBottom: 5,
                    paddingStart: 10,
                    paddingTop: 6,
                  }}
                >
                  {" "}
                  Video sản phẩm :{" "}
                </Text>
                {Datavideo != "" && (          
<View style={{alignItems:'center'}}>
  {Datavideo.map((item,index) => (
    <View key={item.id}>
          
    <YoutubePlayer
width={450}
height={268}
                  play={playing}
                  videoId={item.linkvideo}
                  onChangeState={onStateChange}
                />
  
    </View>
  ))}
  

</View>
)}
                <View></View>
              </View>

              <Text style={{ fontSize: 18 }}>Mô tả : </Text>
              <Text style={{ fontSize: 16 }}>{Data.content}</Text>
            </View>
            <View
              style={{
                marginTop: 30,
                alignItems: "center",
                backgroundColor: "#0f7cb8",
              }}
            >
              <Text style={{ fontSize: 20, padding: 10, color: "white" }}>
                Sản phẩm bạn có thể thích
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              {isloadingproduct ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={Dataproduct}
                  keyExtractor={({ id }, index) => id}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                    onPress={() =>
                      props.navigation.push("Detail", {
                        idproduct: item.id,
                        id_category: item.id_categories,
                        idproductpara: item.id_brand,
                        check_return: 0,
                      })
                    }
                    >
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: "white",
                        borderWidth: 1,
                        borderRadius: 25,
                        margin: 10,
                      }}
                    >
                      <Image
                        style={{
                          width: 200,
                          height: 100,
                          borderTopLeftRadius: 25,
                          borderTopRightRadius: 25,
                        }}
                        source={{
                          uri: item.img,
                        }}
                      />
                      <Text style={{ fontSize: 15 }}> {item.name}</Text>
                    </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            margin: 5,
          }}
        >
          <TouchableOpacity style={{ width: 30, height: 30 }}>
            <Image
              style={{ width: 30, height: 30, margin: 5 }}
              source={require("../Img/next.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 30, height: 30 }}>
            <Image
              style={{ width: 30, height: 30, margin: 5 }}
              source={require("../Img/messenger.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "red",
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 10,
              paddingTop: 10,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: "white",fontWeight:'bold' }}>Đăng kí tư vấn</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 10,
              paddingTop: 10,
              borderRadius: 15,
            }}
            onPress={() => props.navigation.replace('DK_from',{check : Data.id,iduser : Adminaccount[0].id})}
          >
            <Text style={{ color: "white",fontWeight:'bold' }}>Đăng kí lái thử</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
