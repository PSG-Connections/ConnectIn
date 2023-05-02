/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function ProfileHeader ({ data, handleChoosePhoto }: any) {
  return (
    <View>
      <View className="w-full bg-[#dbd9d9]  flex flex-row items-center justify-center">
        <View className="translate-y-20 w-[25%] pl-2">
          <Image
            className="h-[130px] w-[130px] rounded-full"
            source={(data?.profile_image_url) ? { uri: data?.profile_image_url } : require('../assets/profile.png')}
          />
        </View>

        <View className="pt-10 h-full flex flex-col w-[65%]">
          <Text className="text-[#6C6C6C] opacity-40 text-[32px] font-bold text-center  ">
            Upload Cover{' '}
          </Text>
          <Text className="text-[#6C6C6C] opacity-40 text-[32px] font-bold text-center ">
            Photo{' '}
          </Text>
        </View>

        <View className=" w-[8%]  h-full  pt-2">
          <Image
            className="h-[36px] w-[36px]  "
            source={require('../assets/imgupload.png')}
          />
        </View>
      </View>
      <View className="pt-20 flex flex-col pb-2 ">
        <View className="pl-2 pt-5">
          <View className="w-[100%] flex items-end pr-5">
            <TouchableOpacity onPress={() => {
              console.log('upload pressed');
              void (async () => {
                await handleChoosePhoto();
              })();
            }}>
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/edit.png')}
              />
            </TouchableOpacity>
            {data?.profile_image_url && <TouchableOpacity onPress={() => {
              console.log('upload pressed');
              void (async () => {
                // handle delete photo
              })();
            }}>
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/delete.png')}
              />
            </TouchableOpacity>}
          </View>
          <Text className="text-black font-black text-[20px]">{data?.first_name} {data?.last_name}</Text>
          <Text className="text-black text-[16px] font-medium">
            {data?.headline}
          </Text>
            { data?.city !== '' && data?.country !== '' && <Text className="text-black text-[16px] font-medium">
              {data?.city} , {data?.country}
              </Text>}
        </View>
      </View>
    </View>
  );
}
