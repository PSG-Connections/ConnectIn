import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Feed from '../screens/feed.screen';
const feedNavigation = createNativeStackNavigator();

export default function FeedNavigation (): JSX.Element {
  return (
    <feedNavigation.Navigator screenOptions={{ headerShown: false }}>
      <feedNavigation.Screen name="FeedNavigationStack" component={Feed} />
    </feedNavigation.Navigator>
  );
}
