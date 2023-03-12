import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, KeyboardAvoidingView } from 'react-native';
import { OTP } from '../constants/common.constant';
import { CheckEmailExistsAPI } from '../apis/user.api';
import { SendOTPAPI } from '../apis/otp.api';

type NavProps = NativeStackScreenProps<any>;
export default function ForgotPasswordEmail ({ navigation, route }: NavProps): JSX.Element {
  const handleOnSubmit = async (values: any) => {
    const response = await CheckEmailExistsAPI({ email: values.email });
    if (response?.error) {
      console.log('error-->', response);
    } else {
      console.log('response-->', response);
      if (!response?.exist) {
        // show error
        return;
      }
      const reqBody = {
        email: values.email,
        type: OTP.TYPE_FORGOT_PASSWORD
      };
      const sendOTPResponse = await SendOTPAPI(reqBody);
      if (sendOTPResponse?.error) {
        console.log('error -->', sendOTPResponse);
        // handle errors
      } else {
        console.log('response -->', sendOTPResponse);
        console.log('otp sent');
        navigation.navigate('Otp', {
          type: OTP.TYPE_FORGOT_PASSWORD,
          description: OTP.DESCRIPTION_FORGOT_PASSWORD,
          userData: {
            email: values.email
          }

        });
      };
    }
  };
  return (
    <KeyboardAvoidingView className="h-screen items-center justify-center" behavior="height">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Image className="h-[30%] w-[50%] "source={require('../assets/otp.png')} />
      </TouchableWithoutFeedback>
        <View className="mb-[7%]">
        {/* <Text className="text-black max-w-[80%] text-center">{routeData?.description}</Text> */}
        </View>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={handleOnSubmit}>
          {({ handleChange, handleSubmit, values }) => (
            <View className="w-[80%] flex flex-col gap-5 items-center justify-center">
              <TextInput
                className="bg-gray-300 w-full rounded-full pl-4 text-black"
                placeholder="Enter Email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                value={values.email}
                placeholderTextColor={'black'}
              />
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}
                className="w-[70%]">
                <Text className="bg-[#1079D9] rounded-3xl text-center pt-2 pb-2  text-white font-bold w-full">
                  Send OTP
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
  </KeyboardAvoidingView>

  );
}
