import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import {searchPosts} from '../lib/appwrite'
import useAppwrite from '../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

//w-Full
const Search = () => {
    const {query} = useLocalSearchParams();
    const { data: posts, isLoading, refetch } = useAppwrite(
      ()=>searchPosts(query)
    );
    
    

   useEffect (()=>{
    refetch()
   },[query])
    

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
        <View className="my-6 px-4">
            
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery ={query}/>
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

export default Search