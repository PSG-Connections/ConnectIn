import 'react-native-gesture-handler';
import AuthContextProvider from './src/contexts/auth.context';
import MainNavigation from './src/navigations/index';
import React from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import UserContextProvider from './src/contexts/user.context';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export default function App (): JSX.Element {
  return (
    <>
      <UserContextProvider>
        <AuthContextProvider>
          <MainNavigation />
        </AuthContextProvider>
      </UserContextProvider>
      <Toast position="bottom" bottomOffset={20} visibilityTime={3000} />
    </>
  );
}
