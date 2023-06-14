import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Feed from '../screens/feed.screen';
import CommentsScreen from '../screens/comments.screen';
import MessageScreen from '../screens/message.screen';

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
      <feedNavigation.Screen name="MessageScreen" component={MessageScreen}
      options={{
        animationTypeForReplace: 'push',
        animation: 'slide_from_right'
      }}
      />
    </feedNavigation.Navigator>
  );
}
