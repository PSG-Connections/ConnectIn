import React from 'react';
import MainNavigation from './src/navigations/index';
import AuthContextProvider from './src/contexts/authContext';

export default function App (): JSX.Element {
  return (
    <AuthContextProvider>
      <MainNavigation />
    </AuthContextProvider>

  );
}
