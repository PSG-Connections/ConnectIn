import React from 'react';
import MainNavigation from './src/navigations/index';
import AuthContextProvider from './src/contexts/auth.context';
import UserContextProvider from './src/contexts/user.context';

export default function App (): JSX.Element {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <MainNavigation />
      </UserContextProvider>
    </AuthContextProvider>

  );
}
