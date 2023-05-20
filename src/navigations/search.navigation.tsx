import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Search from '../screens/search.screen';
import UserProfile from '../components/userProfile.component';
import CommentsScreen from '../screens/comments.screen';
const searchNavigation = createNativeStackNavigator();

export default function SearchNavigation (): JSX.Element {
  return (
    <searchNavigation.Navigator screenOptions={{ headerShown: false }}>
      <searchNavigation.Screen
        name="SearchNavigationStack"
        component={Search}
      />
      <searchNavigation.Screen
        name="UserProfileComponent"
        component={UserProfile}
      />
      <searchNavigation.Screen name="CommentsScreen" component={CommentsScreen}
      options={{
        animationTypeForReplace: 'push',
        animation: 'slide_from_bottom',
        presentation: 'modal'
      }}
      />
    </searchNavigation.Navigator>
  );
}
