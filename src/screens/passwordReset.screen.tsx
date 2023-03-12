import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, KeyboardAvoidingView } from 'react-native';
import { ResetPasswordAPI } from '../apis/user.api';

type NavProps = NativeStackScreenProps<any>;
export default function PasswordReset ({ navigation, route }: NavProps): JSX.Element {
  const routeData = route.params;
  const handleOnSubmit = async (values: any) => {
    const response = await ResetPasswordAPI({ email: routeData?.email, password: values.password });
    if (response?.error) {
      // handle error
      console.log('error-->', response);
    } else {
      // handle success
      navigation.popToTop();
    }
  };
  return (
    <KeyboardAvoidingView className="h-screen items-center justify-center" behavior="height">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Image className="h-[30%] w-[50%] "source={require('../assets/otp.png')} />
      </TouchableWithoutFeedback>
        <View className="mb-[7%]">
        <Text className="text-black max-w-[80%] text-center">Email  {routeData?.email}</Text>
        </View>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          onSubmit={handleOnSubmit}>
          {({ handleChange, handleSubmit, values }) => (
            <View className="w-[80%] flex flex-col gap-5 items-center justify-center">
              <TextInput
                className="bg-gray-300 w-full rounded-full pl-4 text-black"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                value={values.password}
                placeholderTextColor={'black'}
              />
            <TextInput
                className="bg-gray-300 w-full rounded-full pl-4 text-black"
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword}
                placeholderTextColor={'black'}
              />
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}
                className="w-[70%]">
                <Text className="bg-[#1079D9] rounded-3xl text-center pt-2 pb-2  text-white font-bold w-full">
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
  </KeyboardAvoidingView>

  );
}
