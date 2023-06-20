import React from 'react';
import { View, Text, Image } from 'react-native';
import { ConvertISOToMonthYear } from '../helpers/dateTime';

export default function EducationTab (props: any) {
  const startDate = ConvertISOToMonthYear(props?.data?.start_date);
  const endDate = ConvertISOToMonthYear(props?.data?.end_date);
  return (
        <View className="flex flex-col gap-5 pt-4 pb-4">
        <View className="flex flex-row   gap-3">
          <Image
            className="h-[45px] w-[50px]  "
            source={require('../assets/education-replace.png')}
          />
          <View className="flex flex-col pl-2 text-black">
            <Text className="text-white text-[13px] font-black ">
              {props?.data?.school}
            </Text>
            <Text className="text-white text-[11px] font-semibold">
              {props?.data?.degree} - {props?.data?.field_of_study}
            </Text>
            <Text className="text-white text-[10px] font-medium">
              {startDate} - {endDate}
            </Text>
            {/* <Text className="text-black text-[10px] font-medium">
              Australia . Work From Home{' '}
            </Text> */}
          </View>
        </View>
      </View>
  );
}
