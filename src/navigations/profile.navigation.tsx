import ProfileScreen from '../screens/profile.screen';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserUpdateScreen from '../screens/userUpdate.screen';

const profileNavigation = createNativeStackNavigator();

export default function ProfileNavigation ({ navigation }: any): JSX.Element {
  return (
    <profileNavigation.Navigator screenOptions={{ headerShown: false }}>
      <profileNavigation.Screen
        name="ProfileNavigationStack"
        component={ProfileScreen}
      />
      <profileNavigation.Screen name="UserUpdateScreen" component={UserUpdateScreen}/>
    </profileNavigation.Navigator>
  );
}
