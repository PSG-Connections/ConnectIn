import React from 'react';
import { View, Text, Image } from 'react-native';
import { ConvertDateToPostContentDate } from '../helpers/dateTime';
import { UserNotifications } from '../models/user.model';

export default function NotificationComponent (props: any): JSX.Element {
  const notification: UserNotifications = props?.data;
  const notificationTime = ConvertDateToPostContentDate(notification.UpdatedAt);
  return (
        <View className='flex flex-row h-full'>
            <View className='flex w-[15%] items-end justify-center'>
                <Image
                    className="h-[40px] w-[45px] flex  "
                    source={require('../assets/notificationReplace.png')}
                />
            </View>
            <View className='flex w-[75%] px-3 justify-center'>
                <Text className='text-slate-100'>{notification.content}</Text>
            </View>
            <View className='flex w-[10%] justify-center'>
                <Text className='text-slate-100'>{notificationTime}</Text>
            </View>
        </View>
  );
}
