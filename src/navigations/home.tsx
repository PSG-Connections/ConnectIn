/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Icon } from 'react-native-vector-icons/Icon';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
        headerShown: false,
        tabBarShowLabel: false
      }}>
      <homeNavigation.Screen name="Feed" component={FeedNavigation} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name='home-circle' color='black' size={35} style={focused
            ? {
                borderTopColor: 'black',
                borderTopWidth: 2,
                paddingTop: 5
              }
            : {}}/>
        ),
        headerShown: true,
        headerTitle: 'PSG Connect'
      }}/>
      <homeNavigation.Screen name="Search" component={SearchNavigation} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name='search-circle' color={'black'} size={35} style={focused
            ? {
                borderTopColor: 'black',
                borderTopWidth: 2,
                paddingTop: 2
              }
            : {}}/>
        )
      }}/>
      <homeNavigation.Screen name="Post" component={PostNavigation} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialIcons name='add-box' color='black' size={35} style={focused
            ? {
                borderTopColor: 'black',
                borderTopWidth: 2,
                paddingTop: 5
              }
            : {}}/>
        )
      }}/>
      <homeNavigation.Screen
        name="Notifications"
        component={NotificationNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name='bell-circle' color='black' size={35} style={focused
              ? {
                  borderTopColor: 'black',
                  borderTopWidth: 2,
                  paddingTop: 5
                }
              : {}}/>
          )
        }}
      />
      <homeNavigation.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name='person-circle' color='black' size={35} style={focused
            ? {
                borderTopColor: 'black',
                borderTopWidth: 2,
                paddingTop: 5
              }
            : {}}/>
        )
      }}/>
    </homeNavigation.Navigator>
  );
}
