import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/login.screen';
import Register from '../screens/register.screen';

const authNavigation = createNativeStackNavigator();

export default function AuthNavigation (): JSX.Element {
  return (
    <authNavigation.Navigator screenOptions={ { headerShown: false }}>
      <authNavigation.Screen name="Login" component={Login} />
      <authNavigation.Screen name="Register" component={Register} />
    </authNavigation.Navigator>
  );
}
