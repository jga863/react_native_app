import { View, Text, Image } from 'react-native'
import React from 'react'

import {images} from '../constants'

import CustomButtom from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-1">
      <Image source={images.empty} style={{
          width: 270, // w-[270px]
          height: 215, // h-[215px]
        }} resizeMode='contain' />
    
        <Text className = " text-2xl font-psemibold text-center text-white mt-9">
            {title}
        </Text>
        <Text className="text-sm font-pmedium text-gray-100">
            {subtitle}
        </Text>
        
        <CustomButtom
            title="Create video"
            handlePress={() => router.push('/create')}
            containerStyles="w-20 my-1"
        />
    </View>
  )
}

export default EmptyState