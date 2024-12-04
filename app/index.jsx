
import {Link} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
//import { Text, View } from 'react-native-web'; //If we want to work on it on web
import { View, Text } from 'react-native';

export default function App(){

return (
    <View className ="flex-1 items-center justify-center bg-white">
        <Text className = "text-3xl">Aora!</Text>
        <Text>Open up App.js to start working on your app! yo yo INDEX</Text>
        <StatusBar style="auto" />
        <Link href="/profile" style={{color:'blue'}}>Go to Profile</Link>
    </View>
    );
};





