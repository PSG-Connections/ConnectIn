import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';

export default function ChatListTab (props: any) {
  useEffect(() => {
    console.log('---------------', props);
  }, []);
  return (
        <View className="flex flex-row">
            {/* user image */}
            <View className='flex w-[15%] justify-center items-center'>
                <Image
                    className="h-[50px] w-[50px] rounded-full "
                    source={(props?.data.profile_image) ? { uri: props?.data.profile_image } : require('../assets/profile.png')}
                  />
            </View>
            {/* name and last message */}
            <View className='flex w-[80%] justify-center'>
                <View className='flex flex-col ml-2'>
                    <Text className='flex text-[17px]'>{props?.data.first_name} {props?.data.last_name}</Text>
                    <Text className='flex'>{props?.data.message}</Text>
                </View>
            </View>
            {/* time */}
            {/* <View className='flex w-[15%] justify-center items-stretch'>
                <Text className='flex text-[12px]'>Feb 10</Text>
            </View> */}
        </View>
  );
}
