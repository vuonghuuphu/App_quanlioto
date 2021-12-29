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
import { set } from "react-native-reanimated";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function from_addparams (props) {

  const { check_up } = props.route.params;
  const { check } = props.route.params;

  const [size, setsize] = useState('');
  const [weight, setweight] = useState(null);
  const [engine, setengine] = useState('');
  const [maximumPower, setmaximumPower] = useState('');
  const [maximumtorque, setmaximumtorque] = useState('');
  const [acceleration, setacceleration] = useState('')
  const [maximumspeed, setmaximumspeed] = useState('');
  const [fuel, setfuel] = useState('');
  const [fuelTankCapacity, setfuelTankCapacity] = useState('')

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
      if (size != "") {
        fetch(`${baseurl}/api/Parameters`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify( {
            idProduct: check,
            size: size,
            weight: weight,
            engine: engine,
            maximumPower: maximumPower,
            maximumtorque: maximumtorque,
            acceleration: acceleration,
            maximumspeed: maximumspeed,
            fuel: fuel,
            fuelTankCapacity: fuelTankCapacity
        }),
        });
        console.log(JSON.stringify( {
          idProduct: check,
          size: size,
          weight: weight,
          engine: engine,
          maximumPower: maximumPower,
          maximumtorque: maximumtorque,
          acceleration: acceleration,
          maximumspeed: maximumspeed,
          fuel: fuel,
          fuelTankCapacity: fuelTankCapacity
      }))
        props.navigation.navigate('productdetail_ad',{
                   idcategories : check,
                   check: 1,
                 })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [listcategories, setlistcategories] = useState([]);
  const getparameter = async () => {
    try {
      const response = await fetch(
        `${baseurl}/api/Parameters/?id=${check}`
      );
      const json = await response.json();
      setengine(json[0].engine);
      setsize(json[0].size);
      setweight(json[0].weight);
      setmaximumPower(json[0].maximumPower);
      setmaximumtorque(json[0].maximumtorque);
      setacceleration(json[0].acceleration);
      setmaximumspeed(json[0].maximumspeed);
      setfuel(json[0].fuel);
      setfuelTankCapacity(json[0].fuelTankCapacity);
      setlistcategories(json);
    } catch (error) {
      console.error(error);
    } 
  };


if (check_up > 0) {
  getparameter();
}

  const updatecategories = async (idcategory) => {
    try {
      if (idcategory != "") {
        fetch(`${baseurl}/api/Parameters/${idcategory}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify( {
            id: idcategory,
            idProduct: check,
            size: size,
            weight: weight,
            engine: engine,
            maximumPower: maximumPower,
            maximumtorque: maximumtorque,
            acceleration: acceleration,
            maximumspeed: maximumspeed,
            fuel: fuel,
            fuelTankCapacity: fuelTankCapacity
        }),
        });
        props.navigation.navigate('productdetail_ad',{
          idcategories : check,
          check: 1,
        })
      }
      Alert.alert("ok ok");
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
            Thêm thông số kĩ thuật 
          </Text>
        </View></View>
        <View style={{marginBottom:20}}>
        <View style={{ alignItems: "center" }}>
         
        {check_up === 0  && (
          <View>
<TextInput
            style={{
              width: 470,
              height: 40,
              borderWidth: 1,
              borderRadius: 10,
              paddingStart: 10,
              marginBottom: 20,
            }}
            placeholder={"Nhập kích thước"}
            onChangeText={(text) => {
              setsize(text);
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
            placeholder={"Nhập trọng lượng"}
            onChangeText={(text) => {
              setweight(text);
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
            placeholder={"Tốc độ tối đa"}
            onChangeText={(text) => {
              setmaximumspeed(text);
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
            placeholder={"Tăng tốc"}
            onChangeText={(text) => {
              setacceleration(text);
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
            placeholder={"mô đen xoắn cực đại"}
            onChangeText={(text) => {
              setmaximumtorque(text);
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
            placeholder={"Công xuất tối đa"}
            onChangeText={(text) => {
              setmaximumPower(text);
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
            placeholder={"Động cơ"}
            onChangeText={(text) => {
              setengine(text);
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
            placeholder={"nhiên liệu"}
            onChangeText={(text) => {
              setfuel(text);
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
            placeholder={"dung tích bình xăng"}
            onChangeText={(text) => {
              setfuelTankCapacity(text);
            }}
          />
          </View>
        )}

{check_up > 0 && (
          <View>
<TextInput
            style={{
              width: 470,
              height: 40,
              borderWidth: 1,
              borderRadius: 10,
              paddingStart: 10,
              marginBottom: 20,
            }}
            placeholder={"Nhập kích thước"}
            onChangeText={(text) => {
              setsize(text);
            }}
            value={size}
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
            placeholder={"Nhập trọng lượng"}
            onChangeText={(text) => {
              setweight(text);
            }}
            value= {weight}
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
            placeholder={"Tốc độ tối đa"}
            onChangeText={(text) => {
              setmaximumspeed(text);
            }}
            value={maximumspeed.toString()}
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
            placeholder={"Tăng tốc"}
            onChangeText={(text) => {
              setacceleration(text);
            }}
            value={acceleration.toString()}
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
            placeholder={"mô đen xoắn cực đại"}
            onChangeText={(text) => {
              setmaximumtorque(text);
            }}
            value={maximumtorque}
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
            placeholder={"Công xuất tối đa"}
            onChangeText={(text) => {
              setmaximumPower(text);
            }}
            value={maximumPower}
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
            placeholder={"Động cơ"}
            onChangeText={(text) => {
              setengine(text);
            }}
            value={engine}
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
            placeholder={"nhiên liệu"}
            onChangeText={(text) => {
              setfuel(text);
            }}
            value={fuel}
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
            placeholder={"dung tích bình xăng"}
            onChangeText={(text) => {
              setfuelTankCapacity(text);
            }}
            value={fuelTankCapacity}
          />
          </View>
        )}
<View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            {check_up === 0  && (
              <TouchableOpacity
                style={style_App.Login_btn}
                onPress={() => addcategory()}
              >
                <Text style={style_App.Login_txt_btn}>Thêm thông số kĩ thuật</Text>
              </TouchableOpacity>
            )}
            {check_up > 0  && (
              <TouchableOpacity
                style={style_App.Login_btn}
                onPress={() => updatecategories(listcategories[0].id)}
              >
                <Text style={style_App.Login_txt_btn}>Sửa thông số kĩ thuật</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{ flexDirection: "row" }}>
            <View>

            </View>
            <View style={{ borderWidth: 0 }}>
              {check == 0 && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 330, height: 180 }}
                />
              )}

              {check > 0 && (
                <Image
                  source={{ uri: listcategories.img }}
                  style={{ width: 330, height: 180 }}
                />
              )}
            </View>
          </View>
          
        </View>
        </View>
    </SafeAreaView>
  );
}
