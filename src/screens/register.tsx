/* eslint-disable prettier/prettier */

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Formik} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyledSafeAreaView} from '../styles/index';

// import {Toast} from 'toastify-react-native';

const Joi = require('@hapi/joi');

//         <Text className="font-bold text-black pt-4">Already signed up ?</Text>
//         <TouchableOpacity onPress={() => navigation.popToTop()}>
//         <Text className="font-bold text-[#1079D9] pt-4">Sign In</Text>
type NavProps = NativeStackScreenProps<any>;
function Register({navigation}: NavProps): JSX.Element {
  const [pwdVisible, setPwdVisible] = React.useState(true);
  const {authSchema}: any = require('../helpers/validation.schema');

  return (
    <>
      <StyledSafeAreaView className={'h-screen bg-red-200'}>
        <View className=" flex items-center justify-center  bg-white h-full w-full">
          <Text className="text-4xl pb-6 text-black font-bold">Sign Up</Text>
          <View className="shadow-2xl  shadow-black rounded-2xl bg-gray-100 w-[85%]  h-[70%] flex  items-center justify-center">
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={(values: any) => {
                const schema = Joi.object().keys({
                  email: Joi.string().alphanum().min(3).max(30).required(),
                  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
                });
                Joi.validate(
                  {email: 'abc', birthyear: 1994},
                  schema,
                  function (err: any, value: any) {},
                ); // err === null -> valid

                console.log('email -> ', values.email);
                // Toast.success('Email -> ', values.email);
                //TODO: need to debug validate
                // Joi.validate(
                //   {email: values.email, password: values.password},
                //   authSchema,
                //   {abortEarly: false},
                //   (err: any, data: any) => {
                //     if (err) {
                //       console.log(err);
                //     }
                //   },
                // );
                // try {
                //   const value = await authSchema.validate(
                //     {
                //       email: values.email,
                //       password: values.password,
                //     },
                //     {abortEarly: false},
                //   );
                // } catch (err) {
                //   console.log(err);
                // }
              }}>
              {({handleChange, handleSubmit, values}) => (
                <View className="h-[80%] w-[80%] flex flex-col gap-5 items-center ">
                  <TextInput
                    className="bg-[#ECEBEB] font-bold	 w-full rounded-full pl-4"
                    placeholder="First Name"
                    keyboardType="default"
                    onChangeText={handleChange('firstName')}
                    value={values.firstName}
                    placeholderTextColor={'black'}
                  />
                  <TextInput
                    className="bg-[#ECEBEB] font-bold	 w-full rounded-full pl-4"
                    placeholder="Last Name"
                    keyboardType="default"
                    onChangeText={handleChange('lastName')}
                    value={values.lastName}
                    placeholderTextColor={'black'}
                    onFocus={e => e.preventDefault()}
                  />
                  <TextInput
                    className="bg-[#ECEBEB] font-bold	 w-full rounded-full pl-4"
                    placeholder="Phone"
                    keyboardType="default"
                    onChangeText={handleChange('phone')}
                    value={values.phone}
                    placeholderTextColor={'black'}
                  />
                  <TextInput
                    className="bg-[#ECEBEB] font-bold	 w-full rounded-full pl-4"
                    placeholder="Email"
                    keyboardType="default"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    placeholderTextColor={'black'}
                  />
                  <TextInput
                    className="bg-[#ECEBEB] font-bold	 w-full rounded-full pl-4"
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
                    className="bg-[#ECEBEB] font-bold	 w-full rounded-full pl-4"
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

export default Register;
