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
import { ScrollView } from "react-native-gesture-handler";


// const baseurl = "http://192.168.1.43:8109";
const baseurl = "http://192.168.1.104:8109";
// const baseurl = "http://192.168.31.240:8109";
// const baseurl = "http://192.168.31.121:8109";

export default function Admin_account (props) {
  const {check} = props.route.params;
  const [listservices, setlistservices] = useState([])
  const [listuser, setlistuser] = useState([])
  // const getservices = async() => {
  //   let l = [];
  //   let la = [];
  //   try {
  //     const res = await fetch(`${baseurl}/api/users`);
  //     const json = await res.json();
  //     const resa = await fetch(`${baseurl}/api/CheckAdmins`)
  //     const jsona = await resa.json();

  //       for (let index = 0; index < jsona.length; index++) {
          
  //         const resa = await fetch(`${baseurl}/api/CheckAdmins?id=${json[index].id}`)
  //         const jsona = await resa.json();
  //         if (json[index].id == jsona[index].iduser) {
  //           l.push(json[index])
  //         }else{
  //           la.push(json[index])
  //         }
          
  //       }
  //       setlistservices(l)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  const getservices1 = async() => {
    let l = [];
    let la = [];
    try {
      const res = await fetch(`${baseurl}/api/users`);
      const json = await res.json();
      
      if (json != "") {
        const resa = await fetch(`${baseurl}/api/CheckAdmins`)
        const jsona = await resa.json();

        for (let index = 0; index < json.length; index++) {
          la.push(json[index])
        }

       for (let index = 0; index < jsona.length; index++) {
         for (let i = 0; i < json.length; i++) {
           if(json[i].id == jsona[index].iduser){
            l.push(json[i])
           }
         }
       }
       

       setlistuser(la.filter(item => !l.includes(item)))
       setlistservices(l);
      }

      
    } catch (error) {
      console.log(error)
    }
  }


const Phanquyen = async(id) =>{
  try {
    if (id != "") {
      fetch(`${baseurl}/api/CheckAdmins`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iduser: id,
        checkadmin: 1
    }),
    }); 
    props.navigation.navigate('Ad_account',{check : 1})
    }

  } catch (error) {
    console.log(error);
  }
};

const huyphanquyen = async(id)=>{
  console.log(id);
  const resa = await fetch(`${baseurl}/api/CheckAdmins?id=${id}`)
  const jsona = await resa.json();
  console.log(jsona)
  try {
      fetch(`${baseurl}/api/CheckAdmins/${jsona[0].id}`, { method: 'DELETE' })
      props.navigation.navigate('Ad_account',{
        check:0,
      })
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    
    getservices1();
  }, [])
    if(check == 1){getservices1()}
    if(check == 0){getservices1()}

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
          Quản lí user
        </Text>
      </View>


<ScrollView>
      <View>
        {check < 1 && (
            listuser.map((item,index)=>(
              <View 
              style={{padding:6,flexDirection:'row',margin:5,borderWidth:1,flexDirection:'row',justifyContent:'space-between'}}
              key={item.id}
              >
              <View style={{marginStart:10}}>
                  <View>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Email: {item.email}</Text>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Name: {item.name}</Text>
                 </View>
        </View>       

        <View>
                 <TouchableOpacity style={{backgroundColor:'green',margin:8}}
                 onPress={()=>Phanquyen(item.id)}
                 >
                     <Text style={{fontSize:16,fontWeight:'bold',padding:6,color:'white'}}>Phân quyền</Text>
                 </TouchableOpacity>

                
        </View>       
              </View>
            )
            )
          )}

{check > 0 && (
            listservices.map((item,index)=>(
              <View 
              style={{padding:6,flexDirection:'row',margin:5,borderWidth:1,flexDirection:'row',justifyContent:'space-between'}}
              key={item.id}
              >
              <View style={{marginStart:10}}>
                  <View>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Email: {item.email}</Text>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Name: {item.name}</Text>
                 </View>
        </View>       

        <View>
                 <TouchableOpacity style={{backgroundColor:'red',margin:8}}
                 onPress={()=>huyphanquyen(item.id)}
                 >
                     <Text style={{fontSize:16,fontWeight:'bold',padding:6,color:'white'}}>Hủy phân quyền</Text>
                 </TouchableOpacity>

                
        </View>       
              </View>
            )
            )
          )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
