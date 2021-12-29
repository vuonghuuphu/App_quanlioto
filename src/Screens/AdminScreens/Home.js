import React from "react";
import { View,TouchableOpacity,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import search from "../../Img/search.png"
import iconmenu from '../../Img/menuicon.png'

export default function HomeAdmin(props) {
    return(
<SafeAreaView>
            
            <View style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:10,paddingTop:10}}>
    
                <TouchableOpacity onPress={()=> props.navigation.openDrawer()}> 
                    <Image
                    style={{marginLeft:10}}
                    source={iconmenu}
                    />
                </TouchableOpacity> 
    <View>
      <TouchableOpacity onPress={()=> props.navigation.openDrawer()}>   
                    <Image
                    style={{marginRight:10}}
                    source={search}
                    />
                </TouchableOpacity>
    </View>
                
            </View>
        </SafeAreaView>
    );
}