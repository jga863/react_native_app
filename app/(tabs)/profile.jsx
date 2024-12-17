import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import {getUserPosts, signOut} from '../lib/appwrite'
import useAppwrite from '../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

//w-Full
const profile = () => {
    const {user, setUser, setIsLoggedIn} = useGlobalContext();
    
    const { data: posts} = useAppwrite(
      ()=>getUserPosts(user.$id)
    );
    
    const logout = async () => {
    try{
      await signOut();
      setUser(null)
      setIsLoggedIn(false)

      router.replace('/sign-in')
    } catch (error) {
      console.error("Logout Error:", error);
    }}

    console.log("Context Values in Profile:", { user, posts });

  return (
   <SafeAreaView className="bg-primary h-full">
    <FlatList 
      data={posts}
      keyExtractor={(item) => item.key || item.$id}
      renderItem={({ item })=> (
        // <Text className="text-3xl text-white">{item.title}
        // </Text>
        <VideoCard video={item}/>

      )}

      ListHeaderComponent={() => (
        <View className ="w-full justify-center items-center mt-6 mb-12 px-4">
          <TouchableOpacity
          style={{ 
            width:'100%',
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom:10
            }}

          onPress={logout}
          >
            <Image
              source={icons.logout}
              resizeMode='contain'
              style={{
                width:24,
                height:24
              }}
            />
          </TouchableOpacity>

          <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{uri: user?.avatar}}
                className="w-[90%] h-[90%] rounded-lg"
                style={{
                  width:'90%',
                  height: '90%',
                  borderRadius: 5
                  }}
                resizeMode='cover'
              />
          </View>
                <InfoBox
                  title={user?.username}
                  containerStyles = 'mt-5'
                  titleStyles="text-lg"
                />

                <View className="mt-1 flex-row items-center justify-start">
                <InfoBox
                  title={posts.length||0}
                  subtitle="Posts"
                  containerStyles = 'mr-10'
                  titleStyles="text-xl"
                />

                <InfoBox
                  title="1.2K"
                  subtitle="Followers"
                  titleStyles="text-xl"
                />
                </View>
        </View>
      )}

      ListEmptyComponent={()=>(
        <EmptyState 
          title="No Videos Found"
          subtitle="No videos found for this search query"

        />
      )}
     />
   </SafeAreaView>
  )
}

export default profile