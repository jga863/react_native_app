
import {Link} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
//import { Text, View } from 'react-native-web'; //If we want to work on it on web
import { View, Text } from 'react-native';
import React, { useEffect } from 'react';


export default function App(){

return (
    <View className ="flex-1 items-center justify-center bg-white">
        <Text className = "text-3xl font-pblack">Aora!</Text>
        <Text>Open up App.js to start working on your app! yo yo INDEX</Text>
        <StatusBar style="auto" />
        <Link href="/home" style={{color:'blue'}}>Go to Home</Link>
    </View>
    );
};





