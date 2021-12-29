import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import screenMenu from './src/Menu/screenMenu';
import Ad_detailbrand from './src/Screens/AdminScreens/Ad_detailbrand';
import Ad_detailcategories from './src/Screens/AdminScreens/Ad_detailcategories';
import Ad_detailnew from './src/Screens/AdminScreens/Ad_detailnew';
import Ad_detailproduct from './src/Screens/AdminScreens/Ad_detailproduct';
import from_addbrand from './src/Screens/AdminScreens/From_admin/from_addbrand';
import from_addcategory from './src/Screens/AdminScreens/From_admin/from_addcategory.';
import from_addimage from './src/Screens/AdminScreens/From_admin/from_addimage';
import from_addnews from './src/Screens/AdminScreens/From_admin/from_addnews';
import from_addparams from './src/Screens/AdminScreens/From_admin/from_addparams';
import from_addproduct from './src/Screens/AdminScreens/From_admin/from_addproduct';
import from_addservices from './src/Screens/AdminScreens/From_admin/from_addservices';
import MenuAdmin from './src/Screens/AdminScreens/Menuadmin';
import DK_laithu from './src/Screens/DK_laithu';
import Fromaccount from './src/Screens/Fromaccount';
import DK_laithuls from './src/Screens/DK_laithuls';
import NewsDetail from './src/Screens/NewsDetail';
import Product from './src/Screens/Product';
import productdetail from './src/Screens/productdetail';
import screenHome from './src/Screens/screenHome';

import Loading from './src/Screens/screenLoading';
import Login from './src/Screens/screenLogin'
import register from './src/Screens/screenRegister'
import screencategories from './src/Screens/Screencategories';



const Stack = createNativeStackNavigator();

function LoadingScreen({ navigation }){
  setTimeout(()=>{
navigation.replace('Menu')
  },2000);
return (
  <View>
    <Loading/>
  </View>
);
}

export default function App() {
  return (
    
    <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName="Loading">
          <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>  
          <Stack.Screen name= "Menu" component={screenMenu} options={{headerShown:false}}/>
          <Stack.Screen name= "Home" component={screenHome} options={{headerShown:false}}/>
          <Stack.Screen name="Detail" component={productdetail} options={{headerShown:false}}/> 
          <Stack.Screen name="Product" component={Product} options={{headerShown:false}}/>
          <Stack.Screen name="register" component={register} options={{headerShown:false}}/>  
          <Stack.Screen name="Newsdetail" component={NewsDetail} options={{headerShown:false}}/>  
          <Stack.Screen name="MenuAdmin" component={MenuAdmin} options={{headerShown:false}}/>  
          <Stack.Screen name="category_ad" component={Ad_detailcategories} options={{headerShown:false}}/> 
          <Stack.Screen name="category_from" component={from_addcategory} options={{headerShown:false}}/> 
          <Stack.Screen name="productdetail_ad" component={Ad_detailproduct} options={{headerShown:false}}/>   
          <Stack.Screen name="product_from" component={from_addproduct} options={{headerShown:false}}/>   
          <Stack.Screen name="brand_ad" component={Ad_detailbrand} options={{headerShown:false}}/>
          <Stack.Screen name="brand_from" component={from_addbrand} options={{headerShown:false}}/> 
          <Stack.Screen name="newdetail_ad" component={Ad_detailnew} options={{headerShown:false}}/>   
          <Stack.Screen name="new_from" component={from_addnews} options={{headerShown:false}}/>  
          <Stack.Screen name="services_from" component={from_addservices} options={{headerShown:false}}/>  
          <Stack.Screen name="params_from" component={from_addparams} options={{headerShown:false}}/>  
          <Stack.Screen name="img_from" component={from_addimage} options={{headerShown:false}}/>  
          <Stack.Screen name="DK_from" component={DK_laithu} options={{headerShown:false}}/>  
          <Stack.Screen name="account_from" component={Fromaccount} options={{headerShown:false}}/>
          <Stack.Screen name="all_categories" component={screencategories} options={{headerShown:false}}/> 
          <Stack.Screen name="DK_laithuls" component={DK_laithuls} options={{headerShown:false}}/>  
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
