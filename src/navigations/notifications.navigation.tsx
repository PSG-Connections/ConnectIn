import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Notifications from '../screens/notifications.screen';
const notificationNavigation = createNativeStackNavigator();

export default function NotificationNavigation (): JSX.Element {
  return (
    <notificationNavigation.Navigator screenOptions={{ headerShown: false }}>
      <notificationNavigation.Screen
        name="NotificationNavigationStack"
        component={Notifications}
      />
    </notificationNavigation.Navigator>
  );
}
