import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    
    className={`${containerStyles} $ {isLoading? 'opacity-50' :''}`}

    style={{
      marginTop: 25,
      backgroundColor: 'orange',
      borderRadius: 20,          
      minHeight: 62,
      minWidth : 375,      
      justifyContent: 'center',  
      alignItems: 'center',
    }} 

    disabled={isLoading}
    >
      <Text className="text-primary font-psemibold text-center ${textSyle}" style={{fontSize:15}}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton