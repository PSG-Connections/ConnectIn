/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Icon } from 'react-native-vector-icons/Icon';
import React, { useContext, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeedNavigation from './feed.navigation';
import SearchNavigation from './search.navigation';
import PostNavigation from './post.navigation';
import NotificationNavigation from './notifications.navigation';
import ProfileNavigation from './profile.navigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { getFcmToken, storeFCMToken } from '../notifications/firebase.notification';
import { CreateFCMToken } from '../apis/auth.api';
import { AuthContext } from '../contexts/auth.context';
import { getEncryptedItemByKey } from '../helpers/utils';

const homeNavigation = createBottomTabNavigator();

export default function HomeNavigation ({ navigation }: any): JSX.Element {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    // firebase notification get token if not exist
    void (async () => {
      const fcmData = await getEncryptedItemByKey('user_fcm_token');
      if (fcmData === null) {
        // firebase notifications token generate and send to server
        const fcmToken = await getFcmToken();
        const reqBody = {
          token: fcmToken
        };
        const accessToken = authContext.state.userToken;
        const tokenSaveResp = await CreateFCMToken({ data: reqBody, accessToken });
        console.log('CreateFCmToken -->', tokenSaveResp);

        if (tokenSaveResp?.error) {
          // handle errors
        }
        await storeFCMToken(tokenSaveResp);
      }
    })();
  }, []);

  return (
    <homeNavigation.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: '#03001C' }
    }
    )}>
      <homeNavigation.Screen name="Feed" component={FeedNavigation} options={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name='home-circle' color='#CBD5E1' size={35} style={focused
            ? {
                borderTopColor: 'white',
                borderTopWidth: 2,
                paddingTop: 5,
                color: 'white'
              }
            : {}}/>
        ),
        headerShown: false,
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          if (routeName === 'ChatsListScreen' || routeName === 'ChatScreen' ||
          routeName === 'SettingsScreen' || routeName === 'CommentsScreen') {
            return { display: 'none' };
          } else {
            return {
              backgroundColor: '#03001C'
            };
          }
        })(route)
      })}/>
      <homeNavigation.Screen name="Search" component={SearchNavigation} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name='search-circle' color={'#CBD5E1'} size={35} style={focused
            ? {
                borderTopColor: 'white',
                borderTopWidth: 2,
                paddingTop: 2,
                color: 'white'
              }
            : {}}/>
        )
      }}/>
      <homeNavigation.Screen name="Post" component={PostNavigation} options={{
        tabBarStyle: { display: 'none' },
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialIcons name='add-box' color='#CBD5E1' size={35} style={focused
            ? {
                borderTopColor: 'white',
                borderTopWidth: 2,
                paddingTop: 5,
                color: 'white'
              }
            : {}}/>
        )
      }}/>
      <homeNavigation.Screen
        name="Notifications"
        component={NotificationNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name='bell-circle' color='#CBD5E1' size={35} style={focused
              ? {
                  borderTopColor: 'white',
                  borderTopWidth: 2,
                  paddingTop: 5,
                  color: 'white'
                }
              : {}}/>
          )
        }}
      />

      <homeNavigation.Screen name="Profile" component={ProfileNavigation} options={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name='person-circle' color='#CBD5E1' size={35} style={focused
            ? {
                borderTopColor: 'white',
                borderTopWidth: 2,
                paddingTop: 5,
                color: 'white'
              }
            : {}}/>
        ),
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          if (routeName === 'UserUpdateScreen' || routeName === 'UserEducationUpdateScreen' ||
            routeName === 'CommonUserUpdateScreen' || routeName === 'UserExperienceUpdateScreen' ||
            routeName === 'CommentsScreen') {
            return { display: 'none' };
          } else {
            return {
              backgroundColor: '#03001C'
            };
          }
        })(route)
      })}/>
    </homeNavigation.Navigator>
  );
}
