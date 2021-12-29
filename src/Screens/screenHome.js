import React from "react";
import { View ,Text,Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style_App from "../Style";



export default function screenHome (props){
    return(
        <SafeAreaView>
            
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>

                <TouchableOpacity onPress={()=> props.navigation.openDrawer()}> 
                    <Image
                    style={{marginLeft:10}}
                    source={iconmenu}
                    />
                </TouchableOpacity> 

                <TouchableOpacity onPress={()=> props.navigation.openDrawer()}>   
                    <Image
                    style={{marginRight:10}}
                    source={search}
                    />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}