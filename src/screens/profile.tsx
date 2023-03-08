import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/authContext';
import { clearEncryptedItemByKey } from '../helpers/utils';

export default function Profile (): JSX.Element {
  const authContext = useContext(AuthContext);
  const handleOnPressLogOut = async () => {
    try {
      console.log('logout clearing session');

      await clearEncryptedItemByKey('user_session');
    } catch (error) {
      console.log(error);
    }
    authContext.dispatch({ type: 'SIGNED_OUT' });
  };
  return (
    <View className="h-screen bg-amber-100 items-center justify-center">
        <Text className="text-black">Profile here ...............</Text>
        <TouchableOpacity onPress={() => {
          void Promise.resolve(handleOnPressLogOut());
        }}>
          <Text className="font-bold text-[#1079D9] pt-4">Log Out</Text>
          </TouchableOpacity>
  </View>

  );
}
