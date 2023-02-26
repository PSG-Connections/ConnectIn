import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './login';
import HomeNavigation from './home';

const mainStack = createNativeStackNavigator();

export default function MainNavigation() {
  let isSignedIn = true;
  return (
    <NavigationContainer>
      <mainStack.Navigator>
        {/* check authentication -- need to change to global state management */}
        {isSignedIn ? (
          <mainStack.Screen
            name="HomeNavigationStack"
            component={HomeNavigation}
            options={{headerShown: false}}
          />
        ) : (
          <mainStack.Screen
            name="AuthNavigationStack"
            component={AuthNavigation}
            options={{headerShown: false}}
          />
        )}
      </mainStack.Navigator>
    </NavigationContainer>
  );
}
