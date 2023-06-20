import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Feed from '../screens/feed.screen';
import CommentsScreen from '../screens/comments.screen';
import ChatsListScreen from '../screens/chatsList.screen';
import SettingsScreen from '../screens/settings.screen';
import ChatScreen from '../screens/chat.screen';

const feedNavigation = createNativeStackNavigator();

export default function FeedNavigation (): JSX.Element {
  return (
    <feedNavigation.Navigator screenOptions={{ headerShown: false }}>
      <feedNavigation.Screen name="FeedNavigationStack" component={Feed} />
      <feedNavigation.Screen name="CommentsScreen" component={CommentsScreen}
      options={{
        animationTypeForReplace: 'push',
        animation: 'slide_from_bottom',
        presentation: 'modal'
      }}
      />
      <feedNavigation.Screen name="ChatsListScreen" component={ChatsListScreen}
      options={{
        animationTypeForReplace: 'push',
        animation: 'slide_from_right'
      }}
      />
      <feedNavigation.Screen name="ChatScreen" component={ChatScreen}
      options={{
        animationTypeForReplace: 'push',
        animation: 'slide_from_right'
      }}
      />
      <feedNavigation.Screen name="SettingsScreen" component={SettingsScreen}/>
    </feedNavigation.Navigator>
  );
}
