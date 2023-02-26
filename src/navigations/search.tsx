import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Search from '../screens/search';
const searchNavigation = createNativeStackNavigator();

export default function SearchNavigation(): JSX.Element {
  return (
    <searchNavigation.Navigator screenOptions={{headerShown: false}}>
      <searchNavigation.Screen
        name="SearchNavigationStack"
        component={Search}
      />
    </searchNavigation.Navigator>
  );
}
