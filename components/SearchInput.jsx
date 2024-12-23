import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = (initialQuery) => {
    
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery||'');
    //const [showPassword, setshowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false);
  
    return (

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
            justifyContent: 'space-between',
            }}
      
      >
        <TextInput
            style={{
            flex: 1, // Equivalent to 'flex-1'
            color: '#FFFFFF', // Equivalent to 'text-white'
            fontFamily: 'System', // Equivalent to 'font-psemibold' (adjust to your custom font if needed)
            marginTop: 2, // 'mt-0.5' in Tailwind
            fontSize: 16, // Equivalent to 'text-base'
            }}
            value={query}
            placeholder="Search for a video topic"
            placeholderTextColor="#CDCDE0"
            onChangeText={(e) => setQuery(e)}
            onFocus={() => setIsFocused(true)} // Handle focus event
            onBlur={() => setIsFocused(false)} // Handle blur event
        />

         <TouchableOpacity
          onPress = {() => {
              if(!query){
                return Alert.alert('Missing query', "Please input something to search results across database")
              }
              
              if(pathname.startsWith('/search')) router.setParams({query})
              else router.push(`/search/${query}`)

            }}>
                <Image
                    source={icons.search}
                    style={{ height: 20, width:20 }}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        
      </View>
  )
}

export default SearchInput