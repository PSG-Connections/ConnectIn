import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PostScreen from '../screens/post.screen';
const postNavigation = createNativeStackNavigator();

export default function PostNavigation (): JSX.Element {
  return (
    <postNavigation.Navigator screenOptions={{ headerShown: false }}>
      <postNavigation.Screen name="PostNavigationStack" component={PostScreen} />
    </postNavigation.Navigator>
  );
}
