import React from 'react';
import {ImageBackground, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import style_App from '../Style';
import Logo from '../Img/Logo_autoapp.jpg'

export default function  screenLoading (){
    return (
        <SafeAreaView>
            <View style = {style_App.Loading_Background}> 

                    <View style = {style_App.Loading_Logo}>
                        <Image
                        style = {style_App.Loading_SizeLogo}
                        source = {Logo}
                        />
                    </View>
                    
            </View>
        </SafeAreaView>
    );
}