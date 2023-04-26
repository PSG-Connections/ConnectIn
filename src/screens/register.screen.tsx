import * as Yup from 'yup';

import { Formik } from 'formik';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OTP } from '../constants/common.constant';
import React from 'react';
import { RegisterUserAPI } from '../apis/user.api';
import { SendOTPAPI } from '../apis/otp.api';
import { StyledSafeAreaView } from '../styles/index';
import { validEmail } from '../constants/regex';

type NavProps = NativeStackScreenProps<any>;
export default function Register ({ navigation }: NavProps): JSX.Element {
  const userInfo = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const [pwdVisible] = React.useState(true);
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .trim()
      .required('Name is required!')
      .min(3, 'Invalid name!'),
    lastName: Yup.string()
      .trim()
      .required('Last name is required!')
      .typeError('Name must be a string!'),
    phone: Yup.number().required('Phone number is required!'),
    email: Yup.string()
      .email('Invalid email!')
      .required('Email is required!')
      .matches(validEmail, 'Invalid email'),
    password: Yup.string()
      .trim()
      .min(8, 'Password is too short!')
      .required('Password is required!'),
    confirmPassword: Yup.string().equals(
      [Yup.ref('password')],
      'Passwords do not match!'
    )
  });

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
              validationSchema={validationSchema}
              initialValues={userInfo}
              onSubmit={handleOnSubmit}>
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                touched,
                values,
                errors
              }) => {
                const {
                  firstName,
                  lastName,
                  phone,
                  email,
                  password,
                  confirmPassword
                } = values;
                return (
                  <View className="h-[80%] w-[80%] flex flex-col gap-5 items-center ">
                    <View className="h-[10%] w-[100%]">
                      {touched.firstName && errors.firstName
                        ? (
                        <Text className="text-s text-red-600 font-medium">
                          {errors.firstName}
                        </Text>
                          )
                        : (
                        <></>
                          )}
                      <TextInput
                        className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                        placeholder="First Name"
                        keyboardType="default"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        value={values.firstName}
                        placeholderTextColor={'black'}
                      />
                    </View>
                    <View className="h-[10%] w-[100%]">
                      {touched.lastName && errors.lastName
                        ? (
                        <Text className="text-s text-red-600 font-medium">
                          {errors.lastName}
                        </Text>
                          )
                        : (
                        <></>
                          )}
                      <TextInput
                        className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                        placeholder="Last Name"
                        keyboardType="default"
                        onChangeText={handleChange('lastName')}
                        value={values.lastName}
                        placeholderTextColor={'black'}
                        onFocus={(e: any) => e.preventDefault()}
                      />
                    </View>
                    <View className="h-[10%] w-[100%]">
                      {touched.phone && errors.phone
                        ? (
                        <Text className="text-s text-red-600 font-medium">
                          {errors.phone}
                        </Text>
                          )
                        : (
                        <></>
                          )}
                      <TextInput
                        className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                        placeholder="Phone"
                        keyboardType="number-pad"
                        onChangeText={handleChange('phone')}
                        value={values.phone}
                        placeholderTextColor={'black'}
                      />
                    </View>
                    <View className="h-[10%] w-[100%]">
                      {touched.email && errors.email
                        ? (
                        <Text className="text-s text-red-600 font-medium">
                          {errors.email}
                        </Text>
                          )
                        : (
                        <></>
                          )}
                      <TextInput
                        className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={handleChange('email')}
                        value={values.email}
                        placeholderTextColor={'black'}
                      />
                    </View>
                    <View className="h-[10%] w-[100%]">
                      {touched.password && errors.password
                        ? (
                        <Text className="text-s text-red-600 font-medium">
                          {errors.password}
                        </Text>
                          )
                        : (
                        <></>
                          )}
                      <TextInput
                        className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                        placeholder="Password"
                        secureTextEntry={pwdVisible}
                        onChangeText={handleChange('password')}
                        value={values.password}
                        placeholderTextColor={'black'}
                      />
                    </View>
                    <View className="h-[10%] w-[100%] mb-10">
                      {touched.confirmPassword && errors.confirmPassword
                        ? (
                        <Text className="text-s text-red-600 font-medium">
                          {errors.confirmPassword}
                        </Text>
                          )
                        : (
                        <></>
                          )}
                      <TextInput
                        className="bg-[#ECEBEB] font-bold w-full rounded-full pl-4 text-black"
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        onChangeText={handleChange('confirmPassword')}
                        value={values.confirmPassword}
                        placeholderTextColor={'black'}
                      />
                    </View>
                    <View className="h-[10%] w-[100%] items-center">
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
                  </View>
                );
              }}
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
