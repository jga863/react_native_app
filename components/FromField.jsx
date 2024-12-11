import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FromField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    
    const [showPassword, setshowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false);
  
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
      {title}
      </Text>
      
      <View 
        style={{
            marginTop: 10,
            borderWidth: 2,
            borderColor: isFocused ? '#FF9C01' : '#232533', // Equivalent to 'border-black-200'
            width: '100%',
            height: 64, // Equivalent to 'h-16'
            paddingHorizontal: 16, // Equivalent to 'px-4'
            backgroundColor: '#1E1E2D', // Equivalent to 'bg-black-100'
            borderRadius: 16, // Equivalent to 'rounded-2xl'
            alignItems: 'center', // Equivalent to 'items-center'
            flexDirection: 'row',
            }}
      
      >
        <TextInput
            style={{
            flex: 1, // Equivalent to 'flex-1'
            color: '#FFFFFF', // Equivalent to 'text-white'
            fontFamily: 'System', // Equivalent to 'font-psemibold' (adjust to your custom font if needed)
            fontSize: 16, // Equivalent to 'text-base'
            }}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
            onFocus={() => setIsFocused(true)} // Handle focus event
            onBlur={() => setIsFocused(false)} // Handle blur event
            {...props}
        />

        {title==='Password' && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                <Image
                    source={!showPassword ? icons.eye : icons.eyehide}
                    className= 'w-6 h-6'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )}

      </View>
    </View>
  )
}

export default FromField