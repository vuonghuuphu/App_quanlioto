import React from "react";
import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { SliderBox } from "react-native-image-slider-box";
import backicon from "../Img/Backbtn.png";

import search from "../Img/search.png";
import star from "../Img/star.png";
import Like_dis from "../Img/heartdis.png";
import mess from "../Img/messenger.png";
import call from "../Img/phonecall.png";
import share from "../Img/next.png";


// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function Product(props) {
  //  const {id_categories} = props.route.params;
  //  const {id_brand} = props.route.params;
  const [isloading, setisloading] = useState(true);
  const [DataProduct, setDataProduct] = useState([]);
  const getProduct = async () => {
    const { id } = props.route.params;
    try {
      const response = await fetch(
        `${baseurl}/api/Products?id=${id}&id_brand=0`
      );
      const json = await response.json();
      setDataProduct(json);
      console.log(id)
    } catch (error) {
      console.error(error);
    } finally {
      setisloading(false);
    }
  };

  const { id } = props.route.params;
  const [DataCategories, setDataCategories] = useState([]);
  const [isloadingcategories, setisloadingcategories] = useState(true);
  const getcategory = async () => {
    try {
      const response = await fetch(`${baseurl}/api/categories/${id}`);
      const json_categories = await response.json();
      //   console.log(json_categories);
      setDataCategories(json_categories);
    } catch (error) {
      console.error(error);
    } finally {
      setisloadingcategories(false);
    }
    console.log(DataCategories);
  };

  const imgdata = [];
  const [isloadingba, setisloadingba] = useState(true);
  const [Databrand, setDatabrand] = useState([]);
  const [Databrand1, setDatabrand1] = useState([]);
  const getpanel = async () => {
    const imgdata = [];
    try {
      const response = await fetch(`${baseurl}/api/Panels`);
      const json_brands = await response.json();
      setDatabrand(json_brands);
      console.log("Data panel");
      console.log(Databrand);
      for (let i = 0; i < Databrand.length; i++) {
        imgdata.push(Databrand[i].img);
      }
      setDatabrand1(imgdata);
    } catch (error) {
      console.error(error);
    } finally {
      setisloadingba(false);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
  };

  useEffect(() => {
    getpanel();
    getProduct();
    getcategory();
    getpanel();
  }, []);
  }
  useEffect(() => {
    getProduct();
    getcategory();
  }, [])
  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.navigate("Menu")}>
            <Image style={{ width: 25, height: 25 }} source={backicon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={search} />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: "#0f7cb8" }}>
          <Text
            style={{
              padding: 10,
              color: "white",
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            Sản phẩm {DataCategories.name}
          </Text>
        </View>

        {/* <SliderBox
          images={Databrand1}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          sliderBoxHeight={300}
          autoplay={true}
          circleLoop={true}
        /> */}

        <View>
          {isloading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={DataProduct}
              keyExtractor={({ id }, index) => id}
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
                  style={{
                    backgroundColor: "white",
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
                      uri: item.img,
                    }}
                  />
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {" "}
                    {item.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, color: "black" }}>
                        {" "}
                        Giá bán :
                      </Text>
                      <Text style={{ fontSize: 16, color: "red" }}>
                        {" "}
                        {item.price}{" "}
                      </Text>
                      <Text style={{ fontSize: 16, color: "black" }}>
                        {" "}
                        vnd{" "}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row", paddingRight: 50 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "grey",
                          textDecorationLine: "line-through",
                          marginLeft: 5,
                        }}
                      >
                        Giá cũ: 20000000 vnd
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 10,
                      }}
                    >

                      <View style={{flexDirection: "row",}}>
                        <TouchableOpacity 
                        onPress={()=> onShare()}
                        >
                          <Image
                          style={{ width: 30, height: 30 }}
                          source={share}
                        />
                        </TouchableOpacity>

                        <Image
                            style={{ width: 30, height: 30, marginLeft: 20 }}
                            source={mess}
                          />
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        

                        {/* <TouchableOpacity
                          style={{
                            backgroundColor: "green",
                            paddingBottom: 8,
                            paddingTop: 8,
                            paddingRight: 25,
                            paddingLeft: 25,
                            borderRadius: 10,
                            marginRight: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            DK lai thu
                          </Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                          style={{
                            backgroundColor: "green",
                            paddingBottom: 8,
                            paddingTop: 8,
                            paddingRight: 25,
                            paddingLeft: 25,
                            borderRadius: 10,
                          }}
                          onPress={() =>
                            props.navigation.push("Detail", {
                              idproduct: item.id,
                              id_category: item.id_categories,
                              idproductpara: item.id_brand,
                              check_return: 0,
                            })
                          }
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Xem them
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
