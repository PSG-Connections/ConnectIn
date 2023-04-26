/* eslint-disable react-native/no-color-literals */
import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, TouchableOpacity } from 'react-native';

// import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavProps = NativeStackScreenProps<any>;
export default function UserUpdateScreen ({ navigation, route }: NavProps): JSX.Element {
  const userData = route.params;
  useEffect(() => {
    console.log('Intro use effect called-->');
    // navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
  }, []);

  return (
    <SafeAreaView className='bg-slate-800 h-full w-full pb-3'>
      <ScrollView className=''>
        <View className="ml-5 mt-10">
          <View className="mt-15">
            <Text className="text-white">First Name*</Text>
            <TextInput
              value={userData?.first_name}
              className="text-white"
              // onChangeText={...userContext.SaveUserInContext(
              //   userContext.userData.first_name
              // )}
              style={searchStyle.searchInput}
              underlineColorAndroid="white"
            />
          </View>
          <View className="mt-5">
            <Text className="text-white">Last Name*</Text>
            <TextInput
              value={userData?.last_name}
              className="text-white"
              // onChangeText={...userContext.SaveUserInContext(
              //   userContext.userData.last_name
              // )}
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
            />
          </View>
          <View className="mt-5 mb-10">
            <Text className="text-white">Industry*</Text>
            <TextInput
              className="text-white"
              style={searchStyle.searchInput}
              underlineColorAndroid="white"
            />
          </View>
          <Text className="font-bold text-white text-xl">Education</Text>

          <View className="mt-5 mb-10">
            <Text className="text-white">Education*</Text>
            <TextInput
              className="text-white"
              style={searchStyle.searchInput}
              underlineColorAndroid="white"
            />
          </View>
          <Text className="font-bold text-white text-xl">Location</Text>
          <View className="mt-5">
            <Text className="text-white">Country/Region*</Text>
            <TextInput
              className="text-white"
              style={searchStyle.searchInput}
              underlineColorAndroid="white"
            />
          </View>
          <View className="mt-5 mb-10">
            <Text className="text-white">City*</Text>
            <TextInput
              className="text-white"
              style={searchStyle.searchInput}
              underlineColorAndroid="white"
            />
          </View>
          <Text className="font-bold text-white text-xl">Contact Info</Text>
          <View className="mt-5">
            <Text className="text-white">Phone*</Text>
            <TextInput
              value={userData?.phone}
              className="text-white"
              style={searchStyle.searchInput}
              underlineColorAndroid="white"
            />
          </View>
          <View className="mt-5">
            <Text className="text-white">Email*</Text>
            <TextInput
              value={userData?.email}
              // onChangeText={userContext.SaveUserInContext(
              //   userContext.userData.email
              // )}
              className="text-white"
              style={searchStyle.searchInput}
              underlineColorAndroid="white"
            />
          </View>
        </View>
      </ScrollView>
      <View className='bg-slate-800 w-[100%] h-[45px] fixed bottom-0 flex border-t-2 border-slate-500'>
        <View className='flex w-[95%] justify-center mx-auto my-[2px] pt-1'>
          <TouchableOpacity
            className='h-[100%] rounded-full w-[100%] bg-blue-500 flex justify-center items-center'
          >
              <Text className='flex'>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const searchStyle = StyleSheet.create({
  searchInput: {
    height: 35,
    color: '#64AFCB',
    borderColor: '#64AFCB',
    borderStyle: 'solid',
    marginTop: 10,
    backgroundColor: '#1E293B',
    position: 'relative',
    zIndex: 2
  }
});
