import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, KeyboardAvoidingView } from 'react-native';
import { VerifyOTPAPI } from '../apis/otp.api';
import { OTP } from '../constants/common.constant';
import { AuthContext } from '../contexts/auth.context';

type NavProps = NativeStackScreenProps<any>;
export default function Otp ({ navigation, route }: NavProps): JSX.Element {
  const routeData = route.params;
  const authContext = useContext(AuthContext);
  const [disableVerify, setDisableVerify] = useState(true);
  const [userData, setUserData] = useState({ email: '' });
  useEffect(() => {
    setUserData(routeData?.userData);
  }, []);
  const handleOnSubmit = async (values: any) => {
    const reqBody = {
      email: userData?.email,
      otp: values.otp
    };
    const response = await VerifyOTPAPI(reqBody);
    if (response?.error) {
      // handle error
      console.log('error -->', response);
    } else {
      // handle success
      console.log('response', response);
      const accessToken = response?.token?.access_token;
      if (routeData?.type === OTP.TYPE_VERIFY_ACCOUNT) {
        authContext.dispatch({ type: 'SIGNED_IN', accessToken });
      } else if (routeData?.type === OTP.TYPE_FORGOT_PASSWORD) {
        navigation.navigate('PasswordReset', {
          email: userData.email
        });
      }
    }
  };
  const handleVerifyStyles = () => {
    if (!disableVerify) {
      return 'bg-[#1079D9] rounded-3xl text-center pt-2 pb-2  text-white font-bold w-full';
    }
    return 'bg-[#75b2ec] rounded-3xl text-center pt-2 pb-2  text-gray-50 font-bold w-full';
  };
  return (
    <KeyboardAvoidingView className="h-screen items-center justify-center" behavior="height">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Image className="h-[30%] w-[50%] "source={require('../assets/otp.png')} />
      </TouchableWithoutFeedback>
        <View className="mb-[7%]">
        <Text className="text-black max-w-[80%] text-center">{routeData?.description}</Text>
        <Text className="text-black max-w-[80%] text-center">Email sent to {userData?.email}</Text>
        </View>
        <Formik
          initialValues={{ otp: '' }}
          onSubmit={handleOnSubmit}>
          {({ handleChange, handleSubmit, values }) => (
            <View className="w-[80%] flex flex-col gap-5 items-center justify-center">
              <TextInput
                className="bg-gray-300 w-full rounded-full pl-4 text-black"
                placeholder="Enter OTP"
                maxLength={6}
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text.length === 6) {
                    setDisableVerify(false);
                  } else {
                    setDisableVerify(true);
                  }
                  handleChange('otp')(text);
                }}
                value={values.otp}
                placeholderTextColor={'black'}
              />
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}
                disabled={disableVerify}
                className="w-[70%]">
                <Text className={handleVerifyStyles()}>
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
  </KeyboardAvoidingView>

  );
}
