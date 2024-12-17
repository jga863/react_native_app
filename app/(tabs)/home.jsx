import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import images from '../../constants/images'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLastestPosts} from '../lib/appwrite'
import useAppwrite from '../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

//w-Full
const Home = () => {

    const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);

    const { data: lastestPosts} = useAppwrite(getLastestPosts);
    
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = async () => {
      setRefreshing(true);
      
      await refetch();

      setRefreshing(false);
    };
    

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
        <View className="my-6 px-4 space-y-6">
          <View className = "justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Welcome Back
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                Carlos
              </Text>
            </View>
            <View className = "mt-1.5">
              
              <Image
                source={images.logoSmall}
                className="w-9 h-10"
                resizeMode='contain'
              />

            </View>
          </View>

          <SearchInput />

          <View className="w-full flex-1 pt-3 pb-0">
            <Text className="text-gray-100 text-lg font-pregular mb-3">
              Lastest Videos
            </Text>

            <Trending posts ={lastestPosts ?? []}/>
            
          </View>
        </View>
      )}

      ListEmptyComponent={()=>(
        <EmptyState 
          title="No Videos Found"
          subtitle="Be there first one to upload a video"

        />
      )}
      refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>}
    />
   </SafeAreaView>
  )
}

export default Home