import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/login.screen';
import Register from '../screens/register.screen';
import Otp from '../screens/otp.screen';
import ForgotPasswordEmail from '../screens/forgotPasswordEmail.screen';
import PasswordReset from '../screens/passwordReset.screen';

const authNavigation = createNativeStackNavigator();

export default function AuthNavigation (): JSX.Element {
  return (
    <authNavigation.Navigator screenOptions={ { headerShown: false }}>
      <authNavigation.Screen name="Login" component={Login} />
      <authNavigation.Screen name="Register" component={Register} />
      <authNavigation.Screen name="Otp" component={Otp} />
      <authNavigation.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmail}/>
      <authNavigation.Screen name="PasswordReset" component={PasswordReset}/>
    </authNavigation.Navigator>
  );
}
