import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyledSafeAreaView } from '../styles/index';
import { RegisterUserAPI } from '../apis/user.api';
import { OTP } from '../constants/common.constant';
import { SendOTPAPI } from '../apis/otp.api';

type NavProps = NativeStackScreenProps<any>;
export default function Register ({ navigation }: NavProps): JSX.Element {
  const [pwdVisible] = React.useState(true);

  const handleOnSubmit = async (values: any) => {
    const response = await RegisterUserAPI(values);
    console.log('response -->', response);
    if (response?.error) {
      console.log('error -->', response);
      // set state
    } else {
      console.log('sending otp');
      const reqBody = {
        email: values.email,
        type: OTP.TYPE_VERIFY_ACCOUNT
      };
      const response = await SendOTPAPI(reqBody);
      if (response?.error) {
        console.log('error -->', response);
        // handle errors
      } else {
        console.log('otp sent');

        navigation.navigate('Otp', {
          type: OTP.TYPE_VERIFY_ACCOUNT,
          description: OTP.DESCRIPTION_VERIFY_ACCOUNT,
          userData: {
            email: values.email
          }
        });
      }
    }
  };
  return (
    <>
      <StyledSafeAreaView className={'h-screen bg-red-200'}>
        <View className=" flex items-center justify-center  bg-white h-full w-full">
          <Text className="text-4xl pb-6 text-black font-bold">Sign Up</Text>
          <View className="shadow-2xl  shadow-black rounded-2xl bg-gray-100 w-[85%]  h-[70%] flex  items-center justify-center">
            <Formik
              initialValues={{
                firstName: 'p',
                lastName: 'v',
                phone: '6379494632',
                email: '19pt17@psgtech.ac.in',
                password: '1',
                confirmPassword: '1'
              }}
              onSubmit={handleOnSubmit}>
              {({ handleChange, handleSubmit, values }) => (
                <View className="h-[80%] w-[80%] flex flex-col gap-5 items-center ">
                  <TextInput
                    className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                    placeholder="First Name"
                    keyboardType="default"
                    onChangeText={handleChange('firstName')}
                    value={values.firstName}
                    placeholderTextColor={'black'}
                  />
                  <TextInput
                    className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                    placeholder="Last Name"
                    keyboardType="default"
                    onChangeText={handleChange('lastName')}
                    value={values.lastName}
                    placeholderTextColor={'black'}
                    onFocus={e => e.preventDefault()}
                  />
                  <TextInput
                    className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                    placeholder="Phone"
                    keyboardType="number-pad"
                    onChangeText={handleChange('phone')}
                    value={values.phone}
                    placeholderTextColor={'black'}
                  />
                  <TextInput
                    className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    placeholderTextColor={'black'}
                  />
                  <TextInput
                    className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                    placeholder="Password"
                    secureTextEntry={pwdVisible}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    placeholderTextColor={'black'}
                  />
                  {/* <Image
                  className="h-[15px] w-[15px]  right-5"
                  source={require('../assets/eye.png')}
                />
              </View> */}
                  <TextInput
                    className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
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
                    <Text className="bg-[#1079D9] rounded-3xl text-center pt-2 pb-2  text-white font-bold w-full ">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
          <>
            <View className=" flex-row items-center justify-center">
              <Text className="font-bold text-black pt-4">
                Already signed up ?
              </Text>
              <TouchableOpacity onPress={() => navigation.popToTop()}>
                <Text className="font-bold text-[#1079D9] pt-4"> Sign In</Text>
              </TouchableOpacity>
            </View>
          </>
          <Text className="pt-6 text-[16px] text-[#1079D9] font-bold">
            Read User License Agreement
          </Text>
        </View>
      </StyledSafeAreaView>
    </>
  );
}
