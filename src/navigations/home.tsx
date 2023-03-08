import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import FeedNavigation from './feed';
import SearchNavigation from './search';
import PostNavigation from './post';
import NotificationNavigation from './notifications';
import Profile from '../screens/profile';

const homeNavigation = createBottomTabNavigator();

export default function HomeNavigation (): JSX.Element {
  return (
    <homeNavigation.Navigator screenOptions={
      {
        headerShown: false
        // tabBarShowLabel: false
      }}>
      <homeNavigation.Screen name="Feed" component={FeedNavigation} />
      <homeNavigation.Screen name="Search" component={SearchNavigation} />
      <homeNavigation.Screen name="Post" component={PostNavigation} />
      <homeNavigation.Screen
        name="Notifications"
        component={NotificationNavigation}
      />
      <homeNavigation.Screen name="Profile" component={Profile} />
    </homeNavigation.Navigator>
  );
}
