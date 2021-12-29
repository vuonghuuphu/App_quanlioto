import React, { useEffect, useState } from "react";
import { View, Text ,Image,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function Ad_detailnew (props) {
  const { idcategories } = props.route.params;
  const [Categoriesdetail, setCategoriesdetail] = useState([]);
  const getcategories = async () => {
    try {
      const res = await fetch(`${baseurl}/api/news/${idcategories}`);
      const json = await res.json();
      setCategoriesdetail(json)
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteitem = async(id)=>{
    try {
        fetch(`${baseurl}/api/news/${id}`, { method: 'DELETE' })
        props.navigation.navigate('Ad_news',{
          check:1,
        })
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getcategories();
  }, []);
  return (
    <SafeAreaView>
        <View style={{flexDirection:'row',paddingStart:10,paddingEnd:10,justifyContent:'space-between',marginTop:10}}>
        <TouchableOpacity 
        onPress={()=> props.navigation.navigate('Ad_news',{
          check:1,
        })}
        >
                <Image
                style={{width:30,height:30}}
                source={require('../../Img/Backbtn.png')}
                
                />
            </TouchableOpacity>
            <View  style={{flexDirection:'row'}}>
            <TouchableOpacity style={{backgroundColor:"red" ,marginLeft:10,marginRight:10}}
            onPress={()=>deleteitem(Categoriesdetail.id)}
            >
                <Text style={{fontSize:16,fontWeight:'bold',padding:7,color:"white"}}>Xóa danh mục</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"green",marginLeft:10,marginRight:10}}
            onPress={() => props.navigation.push('new_from',{check : Categoriesdetail.id})}
            >
                <Text style={{fontSize:16,fontWeight:'bold',padding:7,color:"white"}}>Sửa danh mục</Text>
            </TouchableOpacity>
            </View>
        </View>
      <View style={{alignItems:'center'}}>
       <Image
       style ={{width:"100%",height:260}}
        source={{uri : Categoriesdetail.img}}
       /></View>
        <Text style={{fontSize:17}}>Mã danh mục: {Categoriesdetail.id}</Text>
        <Text style={{fontSize:17}}>Tên danh mục: {Categoriesdetail.name}</Text>
      
    </SafeAreaView>
  );
}
