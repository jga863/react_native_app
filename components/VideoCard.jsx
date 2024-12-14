import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const VideoCard = ({video: { title, thumbnail, video, creator : {username, avatar}}}) => {
    
    const [play, setPlay] = useState(false);
    
    return (
        <View className="flex-col items-center px-4 mb-14">
            
            <View style={{ flexDirection: 'row', gap: 3, alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View style={{
                        width: 46,
                        height: 46,
                        borderRadius: 12,
                        borderColor: '#FF9C01', // Replace with the actual color
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                    }}>

                        <Image
                            source={{ uri: avatar }}
                            style={{ width: '100%', height: '100%', borderRadius: 9 }}
                            resizeMode="cover"
                        />

                    </View>
                    <View className="justify-center flex-1 gap-y-2" style={{marginLeft: 12, marginTop: 35, marginBottom: 35}}>
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className = "text-xs text-gray-100 font-pregular" numberOfLines={1}>
                            {username}
                        </Text>
                    </View>
                </View>
                    <View>
                        <Image
                            source={icons.menu}
                            style={{ width: 20, height: 20, marginTop: 35, marginBottom: 35 }}
                            resizeMode='contain'
                        />
                    </View>
            </View>
            
                    {play ? (
                        <Text className="text-white">
                            Playing
                        </Text>
                    ):(
                        <TouchableOpacity 
                        activeOpacity={0.7}
                        onPress={()=> setPlay(true)}
                        style={{ width: '100%', height: 200, position: 'relative' }}
                        >   
                           
                            <Image
                                source={{uri: thumbnail}}
                                style={{ width: '100%', height: '100%', borderRadius: 16, marginTop: 12 }}
                                resizeMode="cover"
                            />
                            <Image
                                source={icons.play}
                                style={{ width: 380, height: 48, position: 'absolute', marginTop: 80 }}
                                resizeMode="contain"

                            />


                        </TouchableOpacity>
                    )}

        </View>
    )
}

export default VideoCard;
