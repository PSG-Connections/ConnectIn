import {
  SafeAreaView
} from 'react-native';
import React, { useContext } from 'react';
import { UserProfileProps } from '../models/user.model';
import { UserContext } from '../contexts/user.context';
import Profile from '../components/profile.component';

export default function ProfileScreen (): JSX.Element {
  const userContext = useContext(UserContext);
  const props: UserProfileProps = {
    userDetails: userContext.userData,
    loggedInUser: true
  };

  return (
    <SafeAreaView className=" h-screen w-screen">
      <Profile {...props}/>

    </SafeAreaView>
  );
}
