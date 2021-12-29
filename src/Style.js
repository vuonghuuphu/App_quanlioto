import React from 'react';
import { StyleSheet} from 'react-native';

const style_App = StyleSheet.create({
    
 //Loading Screen   
Loading_Background : {
    height:'100%',
    width:'100%',
},
Loading_Logo :{
    flex:1,
        justifyContent:'center',
        alignItems:'center',  
        height:'100%',
    width:'100%',
    backgroundColor:'white',
},
Loading_SizeLogo:{
    height:400,
    width:400,
},


//Login Screen
Login_input_box:{
    margin:10,
    width:350,
    height:45,
    borderRadius:20,
    borderWidth:1,
    backgroundColor:"white",
    paddingLeft:10,
    color:'black'
},
Login_txt_input:{
  fontSize:15,
  padding:2,
  marginTop:5,
  marginLeft:3,
},
Login_btn:{
    backgroundColor:"#0f7cb8",
    paddingLeft:50,
    paddingRight:50,
    paddingBottom:14,
    paddingTop:14,
    borderWidth:1,
    borderRadius:10,
    marginRight:30,
},
Login_btn1:{
    backgroundColor:"green",
    paddingLeft:50,
    paddingRight:50,
    paddingBottom:14,
    paddingTop:14,
    borderWidth:1,
    borderRadius:10,
    marginRight:30,
},
Login_txt_btn:{
    color:"white",
    fontWeight:'bold',
    fontSize:16,
},


//Menu App Drawer
Menu_Title:{
  margin:15,
  flexDirection:"row",
  alignItems:'center'
},

Menu_Title_text:{
    marginLeft:10,
    color:"white",
    fontSize:15,
    fontWeight:"bold",
},

Menu_icon_user:{
    margin:10,
    alignItems:'center',
    
},

//Home
Home_header:{
    justifyContent:"space-between",
    flexDirection:"row",
},


// Noibat
NB_listcategories:{
    width:120,
    height:70,
    borderTopLeftRadius:25,
    borderTopRightRadius:25 ,
}

});
export default style_App;
