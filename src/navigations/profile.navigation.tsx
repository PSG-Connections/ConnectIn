import Introduction from '../screens/introduction.screen';
import Profile from '../screens/profile.screen';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const profileNavigation = createNativeStackNavigator();

export default function ProfileNavigation(): JSX.Element {
  return (
    <profileNavigation.Navigator screenOptions={{headerShown: false}}>
      <profileNavigation.Screen
        name="ProfileNavigationStack"
        component={Profile}
      />
      <profileNavigation.Screen name="Introduction" component={Introduction} />
    </profileNavigation.Navigator>
  );
}
