import React, { useEffect, useState ,useCallback} from "react";
import { View, Text ,Image, TouchableOpacity, Alert} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";
import { SafeAreaView } from "react-native-safe-area-context";

// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";


export default function Ad_detailproduct (props) {
  const { idcategories } = props.route.params;
  const [Categoriesdetail, setCategoriesdetail] = useState([]);
  const [linkvideo, setlinkvideo] = useState(null);

  const getcategories = async () => {
    try {
      const res = await fetch(`${baseurl}/api/products/${idcategories}`);
      const json = await res.json();
      setCategoriesdetail(json)
    } catch (error) {
      console.log(error);
    }
  };

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const [Dataparameter, setDataparameter] = useState([]);
  const getparameter = async () => {
    try {
      const response = await fetch(
        `${baseurl}/api/Parameters/?id=${idcategories}`
      );
      const json = await response.json();
      setDataparameter(json);
    } catch (error) {
      console.error(error);
    } 
  };

  const [Imgdata, setImgdata] = useState([]);
  const getIMG = async () => {
    try {
      const response = await fetch(
        `${baseurl}/api/ImgProducts?idProduct=${idcategories}`
      );
      const json_img = await response.json();
      setImgdata(json_img);
    } catch (error) {
      console.error(error);
    } 
  };

  const deleteitem = async(id)=>{
    try {
        fetch(`${baseurl}/api/Products/${id}`, { method: 'DELETE' })
        props.navigation.navigate('Ad_product',{
          check:1,
        })
    } catch (error) {
      console.log(error);
    }
  };

  const deleteimg = async(id)=>{
    try {
        fetch(`${baseurl}/api/ImgProducts/${id}`, { method: 'DELETE' })
        props.navigation.replace ('productdetail_ad',{
          idcategories:idcategories,
      })
    } catch (error) {
      console.log(error);
    }
  };


  const [Datavideo, setDatavideo] = useState([]);
  const getvideo = async () => {
    try {
      const response = await fetch(
        `${baseurl}/api/Videoproducts?id=${idcategories}`
      );
      const json = await response.json();
        setDatavideo(json);
      console.log(json)
    } catch (error) {
      console.error(error);
    } 
  };

  const addvideo = async() => {
    try {
      if (linkvideo != "") {
        fetch(`${baseurl}/api/Videoproducts`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_product: idcategories,
            linkvideo: linkvideo,
        }),
        });
        props.navigation.replace ('productdetail_ad',{
          idcategories:idcategories,
      });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatevideo = async(id,idp) =>{
    try {
      if (id != "") {
        fetch(`${baseurl}/api/Videoproducts/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            id_product: idp,
            linkvideo: linkvideo,
          }),
        });
        props.navigation.replace ('productdetail_ad',{
          idcategories:idcategories,
      });
      }
      Alert.alert(linkvideo);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getcategories();
    getparameter();
    getIMG();
    getvideo();
  }, []);
  const {check} = props.route.params;
  if(check == 1){
    getcategories();
    getparameter();
    getIMG();
  }

  return (
    <SafeAreaView>
      
        <View style={{flexDirection:'row',paddingStart:10,paddingEnd:10,justifyContent:'space-between',marginTop:5,marginBottom:5}}>
        <TouchableOpacity 
        onPress={()=>props.navigation.goBack()}
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
            <Text style={{fontSize:16,fontWeight:'bold',padding:7,color:"white"}}>Xóa sản phẩm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"green",marginLeft:10,marginRight:10}}
            onPress={() => props.navigation.push('product_from',{check : Categoriesdetail.id})}
            >
                <Text style={{fontSize:16,fontWeight:'bold',padding:7,color:"white"}}>Sửa sản phẩm</Text>
            </TouchableOpacity>
            </View>
        </View>
      <ScrollView>
      <View style={{alignItems:'center',paddingTop:10,}}>
       <Image
       style ={{width:"100%",height:260}}
        source={{uri : Categoriesdetail.img}}
       />
       </View>
       
       <View>
          <Text style={{margin:10,fontWeight:'bold'}}>Thông tin sản phẩm:</Text>
        <View style={{borderWidth:1,margin:10}}>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>Tên sản phẩm</Text>
          <Text style={{padding:5,width:"80%"}}>{Categoriesdetail.name}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>Giá bán</Text>
          <Text style={{padding:5,width:"80%"}}>{Categoriesdetail.price}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>số lượng</Text>
          <Text style={{padding:5,width:"80%"}}>{Categoriesdetail.quantity}</Text>
          </View>

          <View style={{flexDirection:'row',borderBottomWidth:1,}}>
          <Text style={{width:100,padding:5,borderRightWidth:1,fontWeight:'bold'}}>Giới thiệu</Text>
          <Text style={{padding:5,width:"80%"}}>{Categoriesdetail.content}</Text>
          </View>
         
        </View>
       </View>

        <View>

        {Dataparameter != "" && (
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{margin:10,fontWeight:'bold'}}>Thông số kĩ thuật:</Text>
            <TouchableOpacity style={{backgroundColor:"green" ,marginLeft:10,marginRight:10}}
            onPress={()=>props.navigation.navigate('params_from',{
              check : Categoriesdetail.id,
              check_up : 1,
            })}
            >
            <Text style={{fontSize:14,fontWeight:'bold',padding:7,color:"white"}}>Sửa thông số</Text>
            </TouchableOpacity>
          </View>
          )}
        
          {Dataparameter == "" && (
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{margin:10,fontWeight:'bold'}}>Thông số kĩ thuật:</Text>
            <TouchableOpacity style={{backgroundColor:"green" ,marginLeft:10,marginRight:10}}
            onPress={()=>props.navigation.navigate('params_from',{
              check : Categoriesdetail.id,
              check_up : 0,
            })}
            >
            <Text style={{fontSize:14,fontWeight:'bold',padding:7,color:"white"}}>Thêm thông số</Text>
            </TouchableOpacity>
          </View>
          )}

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

        <View style={{marginBottom:60}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{margin:10,fontWeight:'bold'}}>Hình ảnh chi tiết</Text>
            <TouchableOpacity style={{backgroundColor:"green" ,marginLeft:10,marginRight:10}}
            onPress={()=>props.navigation.navigate("img_from",{check : idcategories})}
            >
            <Text style={{fontSize:14,fontWeight:'bold',padding:7,color:"white"}}>Sửa hình ảnh</Text>
            </TouchableOpacity>
          </View>
          
{
  Imgdata.map((item,index)=>(
    <View key={item.id} 
    style={{alignItems:'center'}}
    >
      <Image
      style={{width:450,height:250,margin:6}}
      source={{uri:item.img}}
      />
<TouchableOpacity
style={{position:'absolute',marginTop:10}}
onPress={()=>deleteimg(item.id)}
>
  <Image
      style={{width:40,height:40,}}
      source={require('../../Img/delete.png')}
      />
</TouchableOpacity>
    </View>
  ))
}
<View style={{marginTop:20}}>
<Text style={{margin:10,fontWeight:'bold'}}>Video minh họa</Text>

<View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10,}}>
  <TextInput
  style={{width:350,borderWidth:1,marginLeft:10,paddingLeft:10}}
  placeholder="link video"
  onChangeText={(text) => {
    setlinkvideo(text);
  }}
  />

            {Datavideo != "" && (
            <TouchableOpacity style={{backgroundColor:"green" ,marginLeft:10,marginRight:10}}
            onPress={()=>updatevideo(Datavideo[0].id,Datavideo[0].id_product)}>
          <Text style={{fontSize:14,fontWeight:'bold',padding:7,color:"white"}}>Sửa video</Text>
            </TouchableOpacity>)}

            {Datavideo == "" && (<TouchableOpacity style={{backgroundColor:"green" ,marginLeft:10,marginRight:10}}
            onPress={()=>addvideo()}>
          <Text style={{fontSize:14,fontWeight:'bold',padding:7,color:"white"}}>them video</Text>
            </TouchableOpacity>)}

</View>
          </View>
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

        </View>
        
        </ScrollView>
    </SafeAreaView>
  );
  }