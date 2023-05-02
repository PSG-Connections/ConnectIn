import React from 'react';
import { View, Text, Image } from 'react-native';
import { ConvertISOToMonthYear } from '../helpers/dateTime';
// import { UserExperience } from '../models/user.model';

export default function ExperienceTab (props: any) {
  const startDate = ConvertISOToMonthYear(props?.data?.start_date?.Time);
  const endDate = ConvertISOToMonthYear(props?.data?.end_date?.Time);
  let workDate;
  if (props?.data?.end_date?.Valid) {
    workDate = `${startDate} - ${endDate}`;
  } else {
    workDate = startDate;
  }
  const employemenType: string = props?.data?.employement_type.toLowerCase();
  return (
        <View className="flex flex-col gap-5 pt-4 pb-4">
        <View className="flex flex-row   gap-3">
          <Image
            className="h-[45px] w-[50px]  "
            source={require('../assets/experience-replace.png')}
          />
          <View className="flex flex-col pl-2 text-black">
            <Text className="text-black text-[13px] font-black ">
              {props?.data?.title}
            </Text>
            <Text className="text-black text-[11px] font-semibold">
              {props?.data?.company}  .  {employemenType}
            </Text>
            <Text className="text-black text-[10px] font-medium">
              {workDate}
            </Text>
            {/* <Text className="text-black text-[10px] font-medium">
              Australia . Work From Home{' '}
            </Text> */}
          </View>
        </View>
      </View>
  );
}
