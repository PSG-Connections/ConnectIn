import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './login.navigation';
import HomeNavigation from './home.navigation';
import Splash from '../screens/splash.screen';
import { AuthContext } from '../contexts/auth.context';

const mainStack = createNativeStackNavigator();

export default function MainNavigation () {
  // const isSignedIn = true;
  const authContext = useContext(AuthContext);
  console.log(authContext.state);

  return (
    <NavigationContainer>
      <mainStack.Navigator>
        {/* check authentication -- need to change to global state management */}
        {
        authContext.state.isLoading
          ? (
          <mainStack.Screen name='splash' component={Splash} options={{ headerShown: false }}/>
            )
          : authContext.state.isSignedIn
            ? (
          <mainStack.Screen
            name="HomeNavigationStack"
            component={HomeNavigation}
            options={{ headerShown: false }}
          />
              )
            : (
          <mainStack.Screen
            name="AuthNavigationStack"
            component={AuthNavigation}
            options={{ headerShown: false }}
          />
              )}
      </mainStack.Navigator>
    </NavigationContainer>

  );
}
