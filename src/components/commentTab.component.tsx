import { Image, Text, View } from 'react-native';

import React from 'react';

export default function CommentTab (props: any): JSX.Element {
  return (
    <View className='w-full h-[50px] mt-[1%] flex flex-row  items-center justify-center'>
        <View className='w-[20%]'>
            <Image className=' rounded-full h-[50px] w-[50px]' source={props?.data?.profile_image_url ? { uri: props?.data?.profile_image_url } : require('../assets/profile.png')}/>
        </View>
        <View className='w-[70%] flex flex-col'>
            <Text className='text-lg font-black text-white'>{props?.data?.first_name} {props?.data?.last_name}</Text>
            <Text className='text-md font-black text-slate-300'>{props?.data?.comment}</Text>
        </View>
    </View>
  );
}
