import AuthContextProvider from './src/contexts/auth.context';
import MainNavigation from './src/navigations/index';
import React from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import UserContextProvider from './src/contexts/user.context';

export default function App(): JSX.Element {
  return (
    <>
      <AuthContextProvider>
        <UserContextProvider>
          <MainNavigation />
        </UserContextProvider>
      </AuthContextProvider>
      <Toast position="bottom" bottomOffset={10} visibilityTime={3000} />
    </>
  );
}
