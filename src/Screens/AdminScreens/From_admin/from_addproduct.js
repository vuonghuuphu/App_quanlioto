import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Logo from "../../../Img/Logo_autoapp.jpg";
import fingerprint from "../../../Img/fingerprint-scan.png";
import DropDownPicker from "react-native-dropdown-picker";

import style_App from "../../../Style";
import { ScrollView } from "react-native-gesture-handler";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function from_addproduct(props) {
  const { check } = props.route.params;

  const [name, setname] = useState(null);
  const [image, setImage] = useState(null);
  const [price, setprice] = useState(null);
  const [quantity, setquantity] = useState(null);
  const [content, setcontent] = useState(null);

  const [idcate, setidcate] = useState(null);
  const [idbrand, setidbrand] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const addcategory = async () => {
    try {
      if (name != "") {
        fetch(`${baseurl}/api/products`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            img: image,
            content: content,
            price: price,
            quantity: quantity,
            id_categories: value,
            id_brand: value1,
          }),
        });
        props.navigation.navigate("Ad_product", { check: 1 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const getproduct  = async () => {
    try {
      const res = await fetch(`${baseurl}/api/products/${check}`);
      const json = await res.json();
      console.log(json)
      setname(json.name);
      setprice(`${json.price}`);
      setquantity(`${json.quantity}`)
      setcontent(json.content)
      setImage(json.img)
      setidcate (json.id_categories)
      setidbrand(json.id_brand)
    } catch (error) {
      console.log(error);
    }
  };

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);

  const getbrands = async () => {
    let list = [];
    try {
      const res = await fetch(`${baseurl}/api/brands`);
      const json = await res.json();
      for (let i = 0; i < json.length; i++) {
        list.push({ label: json[i].name, value: json[i].id });
      }
      setItems1(list);
    } catch (error) {
      console.log(error);
    }
  };

  const [listcategories, setlistcategories] = useState([]);
  const getcategories = async () => {
    let list = [];
    try {
      const res = await fetch(`${baseurl}/api/categories`);
      const json = await res.json();
      for (let i = 0; i < json.length; i++) {
        list.push({ label: json[i].name, value: json[i].id });
      }
      setItems(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcategories();
    getbrands();
    getproduct();
  }, []);

  const updatecategories = async () => {
    try {
      if (name != "") {
        fetch(`${baseurl}/api/products/${check}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: check,
            name: name,
            img: image,
            content: content,
            price: price,
            quantity: quantity,
            id_categories: idcate,
            id_brand: idbrand,
          }),
        });
        props.navigation.navigate("Ad_product", { check: 1 });
      }
      Alert.alert("Đã sửa");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <View>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              style={{ width: 30, height: 30, marginStart: 10 }}
              source={require("../../../Img/Backbtn.png")}
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#0f7cb8",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                padding: 10,
              }}
            >
              Thêm sản phẩm
            </Text>
          </View>
        </View>
      {check < 0 && (   
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            paddingLeft: 10,
            paddingTop: 10,
          }}
        >
          <View style={{}}>
            <Text style={{ paddingTop: 9, paddingRight: 10 }}>
              Danh mục sản phẩm: 
            </Text>
           
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{ width: 200, height: 40, marginBottom: 20 }}
            />
          </View>

          <View style={{}}>
            <Text style={{ paddingTop: 9, paddingRight: 60 }}>
              Thương hiệu:{" "}
            </Text>
            <DropDownPicker
              open={open1}
              value={value1}
              items={items1}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setItems1}
              style={{ width: 200, height: 40, marginBottom: 20 }}
            />
          </View>
        </View>
        )}

        <View style={{ alignItems: "center" }}>
          {check == 0 && (
            <View>
              <TextInput
                style={{
                  width: 470,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingStart: 10,
                  marginBottom: 20,
                  marginTop: 10,
                }}
                placeholder={"Nhập tên sản phẩm"}
                onChangeText={(text) => {
                  setname(text);
                }}
              />
              <TextInput
                style={{
                  width: 470,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingStart: 10,
                  marginBottom: 20,
                }}
                placeholder={"Nhâp giá bán"}
                onChangeText={(text) => {
                  setprice(text);
                }}
              />

              <TextInput
                style={{
                  width: 470,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingStart: 10,
                  marginBottom: 20,
                }}
                placeholder={"Số lượng"}
                onChangeText={(text) => {
                  setquantity(text);
                }}
              />

              <TextInput
                style={{
                  width: 470,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingStart: 10,
                  marginBottom: 20,
                }}
                placeholder={"tiêu đề"}
                onChangeText={(text) => {
                  setcontent(text);
                }}
              />
            </View>
          )}

          {check > 0 && (
            <View>
              <TextInput
                style={{
                  width: 470,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingStart: 10,
                  marginBottom: 20,
                  marginTop: 20,
                }}
                placeholder={"Nhập tên sản phẩm"}
                onChangeText={(text) => {
                  setname(text);
                }}
                value={name}
              />

              <TextInput
                style={{
                  width: 470,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingStart: 10,
                  marginBottom: 20,
                }}
                placeholder={"Nhâp giá bán"}
                onChangeText={(text) => {
                  setprice(text);
                }}
                value={price}
              />

              <TextInput
                style={{
                  width: 470,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingStart: 10,
                  marginBottom: 20,
                }}
                placeholder={"Số lượng"}
                onChangeText={(text) => {
                  setquantity(text);
                }}
                value={quantity}
              />

              <TextInput
                style={{
                  width: 470,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingStart: 10,
                  marginBottom: 20,
                }}
                placeholder={"tiêu đề"}
                onChangeText={(text) => {
                  setcontent(text);
                }}
                value={content}
              />
            </View>
          )}

          <View style={{ flexDirection: "row" }}>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  marginEnd: 20,
                  borderRadius: 20,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingEnd: 20,
                }}
                onPress={() => pickImage()}
              >
                <Text style={style_App.Login_txt_btn}>Thêm ảnh</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  marginEnd: 20,
                  borderRadius: 20,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingEnd: 20,
                  marginTop: 10,
                }}
              >
                <Text style={style_App.Login_txt_btn}>Xóa ảnh</Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderWidth: 1 }}>
              {check == 0 && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 330, height: 180 }}
                />
              )}

              {check > 0 && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 330, height: 180 }}
                />
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >


            {check == 0 && (
                            <TouchableOpacity
                            style={{ backgroundColor: "green", padding: 8 }}
                            onPress={() =>
                              addcategory()
                            }
                          >
                            <Text style={style_App.Login_txt_btn}>
                              Thêm
                            </Text>
                          </TouchableOpacity>
              )}

              {check > 0 && (
                            <TouchableOpacity
                            style={{ backgroundColor: "green", padding: 8 }}
                            onPress={() =>
                              updatecategories()
                            }
                          >
                            <View>
                            <Text style={{color:'white',fontWeight:'bold',paddingLeft:20,paddingRight:20,fontSize:15}}>
                              Sửa
                            </Text>
                            </View>
                          </TouchableOpacity>
              )}

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
