// /* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable prettier/prettier */

import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useContext, useState } from 'react';

import { Formik } from 'formik';
import { validEmail } from '../constants/regex';
import { AuthContext } from '../contexts/auth.context';
import { LoginAPI } from '../apis/auth.api';
import { setEncryptedItemByKey } from '../helpers/utils';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

type NavProps = NativeStackScreenProps<any>;
export default function Login ({ navigation }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);

  const [, setEmailErr] = useState(false);
  // const [pwdError, setPwdError] = useState(false);

  const validate = (email: any) => {
    if (validEmail.test(email)) {
      console.log('Valid Email');
      setEmailErr(false);
    } else {
      setEmailErr(true);
      console.log('Invalid Email');
    }
  };
  const storeSession = async (data: object) => {
    try {
      await setEncryptedItemByKey('user_session', data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordEmail');
  };
  return (
    // <KeyboardAwareScrollView className='flex h-screen'>
    <View className=" flex items-center justify-center  bg-white h-full w-full">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Image
          className="h-[250px] w-[350px] "
          source={require('../assets/loginScreen.png')}
        />
      </TouchableWithoutFeedback>

      <View className="shadow-2xl  shadow-black rounded-2xl bg-gray-100 w-[85%]  h-[45%] flex  items-center justify-center">
        <View className="h-auto pl-4  pb-5 pt-4 w-full text-black flex flex-col gap-2 ">
          <Text className="text-4xl text-black font-bold">Sign In</Text>
          <Text className="text-[16px] text-black">
            Stay Updated on your Professional World.
          </Text>
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            const response = await LoginAPI(values);
            console.log('response in login screen ===>', response);
            const accessToken = response?.token?.access_token;
            const refreshToken = response?.token?.refresh_token;
            const storeData = { accessToken, refreshToken };
            await storeSession(storeData);
            authContext.dispatch({ type: 'SIGNED_IN', accessToken });
          }}>
          {({ handleChange, handleSubmit, values }) => (
            <View className="w-[80%] flex flex-col gap-5 items-center justify-center">
              <TextInput
                className="bg-gray-300 w-full rounded-full pl-4"
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                value={values.email}
              />

              <TextInput
                className="bg-gray-300 w-full rounded-full pl-4"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              <TouchableOpacity onPress={() => {
                handleForgotPassword();
              }}>
              <Text className="font-bold text-[#1079D9] pl-4">
                Forgot Password?
              </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  validate(values.email);
                  handleSubmit();
                }}
                className="w-[70%]">
                <Text className="bg-[#1079D9] rounded-3xl text-center pt-2 pb-2  text-white font-bold w-full ">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-row gap-2">
          <Text className="font-bold text-black pt-4">New to ....?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="font-bold text-[#1079D9] pt-4">Join Us</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
    // </KeyboardAwareScrollView>
  );
}
