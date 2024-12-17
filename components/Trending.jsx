import { View, Text, FlatList, TouchableOpacity, ImageBackground,Image} from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from "../constants";

import { Video, ResizeMode } from 'expo-av'


const zoomIn ={
  0:{
    scale: 0.9
  },
  1: {
    scale: 1.1,
  }
}

const zoomOut ={
  0:{
    scale: 1
  },
  1: {
    scale: 0.9,
  }
}


const TrendingItem = ({ activeItem, item}) => {
  const [play, setPlay] = useState(false);

  return(
    <Animatable.View
      style={{ marginRight: 20, marginTop:5}}
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      {play? (
        <Video
          source={ {uri: "https://www.w3schools.com/html/mov_bbb.mp4"}}
          style={{
            width: 208,   // Ensure width is set
            height: 288,  // Ensure height is set
            borderRadius: 35, // Optional for styling
            backgroundColor: "black", // Ensure visibility
          }}
          resizeMode= "cover"
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status)=>{
            console.log('Playback status:', status);
           if(status.didJustFinish) {
            setPlay(false);
           }
          }}
        />
        ) : (
        <TouchableOpacity 
          style={{
          position: 'relative', 
          justifyContent: 'center', 
          alignItems: 'center'
          }} 
          activeOpacity={0.7} 
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{uri: item.thumbnail }}
            
            style={{
            width: 208, // Corresponding to w-52 (52 * 4 = 208px)
            height: 288, // Corresponding to h-72 (72 * 4 = 288px)
            borderRadius: 35, // Corresponding to rounded-[35px]
            overflow: 'hidden', 
            shadowColor: '#000', 
            shadowOffset: { width: 5, height: 2 }, 
            shadowOpacity: 0.4, 
            shadowRadius: 10,
            }}

            resizeMode ="cover"
          />

          <Image
            source={icons.play}
            style={{ width: 50, height: 50, position:'absolute'}}
            resizeMode='contain'
          />

        </TouchableOpacity>  
      )}

    </Animatable.View>
  )
}

const Trending = ({ posts =[] }) => {

  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged =({viewableItems}) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <TrendingItem activeItem={activeItem} item={item} />
        )}

        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{x: 170}}
        horizontal
        
    />
  )
}

export default Trending