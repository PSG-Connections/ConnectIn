import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyledSafeAreaView } from '../styles/index';

type NavProps = NativeStackScreenProps<any>;
function Register ({ navigation }: NavProps): JSX.Element {
  return (
    <StyledSafeAreaView className={'h-screen bg-red-200'}>
        <Text className="text-black">Register Here !!.........................</Text>
        <View className="flex flex-row gap-2">
          <Text className="font-bold text-black pt-4">Already signed up ?</Text>
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <Text className="font-bold text-[#1079D9] pt-4">Sign In</Text>
          </TouchableOpacity>
        </View>
  </StyledSafeAreaView>

  );
}

export default Register;
