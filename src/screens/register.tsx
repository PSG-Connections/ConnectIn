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
import React from 'react';

function Register(): JSX.Element {
  const [pwdVisible, setPwdVisible] = React.useState(true);

  return (
    <>
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
            onSubmit={values => {
              console.log('email -> ', values.email);
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
                {/* <View style={styles.passwordSection}> */}
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
        <Text className="pt-6 text-[16px] text-[#1079D9] font-bold">
          Read User License Agreement
        </Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  passwordSection: {
    flexDirection: 'row',
    position: 'relative',
  },
});

export default Register;
