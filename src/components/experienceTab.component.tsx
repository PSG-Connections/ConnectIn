import React from 'react';
import { View, Text, Image } from 'react-native';
// import { UserExperience } from '../models/user.model';

export default function Experience (props: any) {
  return (
        <View className="flex flex-col gap-5 pt-10">
        <View className="flex flex-row   gap-3">
          <Image
            className="h-[45px] w-[50px]  "
            source={require('../assets/alixir.png')}
          />
          <View className="flex flex-col pl-2 text-black">
            <Text className="text-black text-[13px] font-black ">
              {props?.data?.title}
            </Text>
            <Text className="text-black text-[11px] font-semibold">
              {props?.data?.company} . Internship
            </Text>
            <Text className="text-black text-[10px] font-medium">
              {props?.data?.start_date} - {props?.data?.end_date}
            </Text>
            {/* <Text className="text-black text-[10px] font-medium">
              Australia . Work From Home{' '}
            </Text> */}
          </View>
        </View>
      </View>
  );
}
