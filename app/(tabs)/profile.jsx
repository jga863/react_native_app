import {Link} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native'
import React from 'react'

const profile = () => {
  return (
    <View className ="flex-1 items-center justify-center bg-white">
      <Text className = "text-3xl">Profile</Text>
      <StatusBar style="auto" />
      <Link href="/" style={{color:'blue'}}>Go to Home</Link>
    </View>
  )
}

export default profile