/* eslint-disable react-native/no-color-literals */
import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, TouchableOpacity } from 'react-native';

// import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { AuthContext } from '../contexts/auth.context';
import { UpdateUserDetails } from '../apis/user.api';
import { emitter } from '../constants/events';

type NavProps = NativeStackScreenProps<any>;
export default function UserUpdateScreen ({ navigation, route }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const userData = route.params;
  const initialUserDetails = {
    firstName: userData?.first_name,
    lastName: userData?.last_name,
    headline: userData?.headline,
    industry: '',
    country: userData?.country,
    city: userData?.city,
    phone: userData?.phone_number,
    email: userData?.email
  };
  const handleUpdateUser = async (values: any) => {
    console.log('form submit values', values);
    const accessToken = authContext.state.userToken;
    const newUser = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phone,
      headline: values.headline,
      country: values.country,
      city: values.city
    };
    const resp = await UpdateUserDetails({ accessToken, newUser });
    if (resp?.error) {
      // handle errors
    }
    console.log('response update user details ->', resp);
    emitter.emit('userUpdated', resp?.user);
    navigation.goBack();
  };
  return (
    <>
    {
      <SafeAreaView className='bg-slate-800 h-full w-full '>
        <Formik
          initialValues={initialUserDetails}
          onSubmit={handleUpdateUser}>
            {({ handleChange, handleSubmit, values }) => (
            <View>
              <ScrollView className='mb-[60px]'>
                <View className="mx-4 mt-10">
                <View className="mt-15">
                  <Text className="text-white">First Name*</Text>
                  <TextInput
                    value={values.firstName}
                    numberOfLines={1}
                    className="text-white"
                    onChangeText={handleChange('firstName')}
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-white">Last Name*</Text>
                  <TextInput
                    value={values.lastName}
                    className="text-white"
                    onChangeText={handleChange('lastName')}
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-white">Headline*</Text>
                  <TextInput
                    className="text-white"
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                    onChangeText={handleChange('headline')}
                    value={values.headline}
                  />
                </View>
                <View className="mt-5 mb-10">
                  <Text className="text-white">Industry*</Text>
                  <TextInput
                    className="text-white"
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                    onChangeText={handleChange('industry')}
                    value={values.industry}
                    editable={false}
                  />
                  <Text className='text-slate-500'>Coming soon</Text>
                </View>

                <Text className="font-bold text-white text-xl">Location</Text>
                <View className="mt-5">
                  <Text className="text-white">Country/Region*</Text>
                  <TextInput
                    className="text-white"
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                    onChangeText={handleChange('country')}
                    value={values.country}
                  />
                </View>
                <View className="mt-5 mb-10">
                  <Text className="text-white">City*</Text>
                  <TextInput
                    className="text-white"
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                    onChangeText={handleChange('city')}
                    value={values.city}
                  />
                </View>
                <Text className="font-bold text-white text-xl">Contact Info</Text>
                <View className="mt-5">
                  <Text className="text-white">Phone*</Text>
                  <TextInput
                    value={values.phone}
                    className="text-white"
                    keyboardType="number-pad"
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                    onChangeText={handleChange('phone')}
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-white">Email*</Text>
                  <TextInput
                    value={values.email}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    className="text-white"
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                  />
                </View>
                </View>
              </ScrollView>
              <View className='bg-slate-800 w-[100%] h-[50px] absolute flex bottom-0 border-t-2 border-slate-500 mb-2'>
                <View className='flex w-[95%] justify-center mx-auto my-[2px] pt-1'>
                  <TouchableOpacity
                    className='h-[100%] rounded-full w-[100%] bg-blue-500 flex justify-center items-center'
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text className='flex'>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>)}
        </Formik>
      </SafeAreaView>
    }
    </>
  );
}

const searchStyle = StyleSheet.create({
  searchInput: {
    paddingTop: 1,
    includeFontPadding: false,
    color: '#64AFCB',
    borderColor: '#64AFCB',
    borderStyle: 'solid',
    marginTop: 10,
    backgroundColor: '#1E293B',
    position: 'relative',
    zIndex: 2
  }
});
