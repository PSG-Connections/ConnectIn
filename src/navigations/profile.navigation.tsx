import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Profile from '../screens/profile.screen';
const profileNavigation = createNativeStackNavigator();

export default function ProfileNavigation (): JSX.Element {
  return (
    <profileNavigation.Navigator screenOptions={{ headerShown: false }}>
      <profileNavigation.Screen
        name="ProfileNavigationStack"
        component={Profile}
      />
    </profileNavigation.Navigator>
  );
}
