import React from 'react';
import { View, Image, Text } from 'react-native';

export default function Usersearchresult (props: any): JSX.Element {
  return (
    <View className='w-[90%] h-[84px] mt-[3%] flex flex-row bg-[#D9D9D9] rounded-3xl items-center justify-center'>
        <View className='w-[20%]'>
            <Image className='h-[50px] w-[50px]' source={props?.data?.profile_image_url === ('""' || '' || undefined) ? { uri: props?.data?.profile_image_url } : require('../assets/profile.png')}/>
        </View>
        <View className='w-[70%] flex flex-col'>
            <Text className='text-[20px] font-black text-black'>{props?.data?.first_name} {props?.data?.last_name}</Text>
            <Text className='text-[12px] font-black text-[#6C6C6C]'>{props?.data?.headline}</Text>
        </View>
    </View>
  );
}
