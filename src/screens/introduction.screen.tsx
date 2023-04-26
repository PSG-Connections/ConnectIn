import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

import {Formik} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView} from 'react-native';
import {UserContext} from '../contexts/user.context';
import {View} from 'react-native';

type NavProps = NativeStackScreenProps<any>;
export default function Introduction({navigation}: NavProps): JSX.Element {
  const userContext = useContext(UserContext);

  return (
    <ScrollView className="bg-slate-800 h-full w-full">
      <View className="ml-5 mt-10">
        <View className="mt-15">
          <Text className="text-white">First Name*</Text>
          <TextInput
            value={userContext.userData.first_name}
            className="text-white"
            onChangeText={...userContext.SaveUserInContext(
              userContext.userData.first_name,
            )}
            style={searchStyle.searchInput}
            underlineColorAndroid="white"
          />
        </View>
        <View className="mt-5">
          <Text className="text-white">Last Name*</Text>
          <TextInput
            value={userContext.userData.last_name}
            className="text-white"
            onChangeText={...userContext.SaveUserInContext(
              userContext.userData.last_name,
            )}
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
            value={userContext.userData.phone}
            className="text-white"
            style={searchStyle.searchInput}
            underlineColorAndroid="white"
          />
        </View>
        <View className="mt-5">
          <Text className="text-white">Email*</Text>
          <TextInput
            value={userContext.userData.email}
            onChangeText={userContext.SaveUserInContext(
              userContext.userData.email,
            )}
            className="text-white"
            style={searchStyle.searchInput}
            underlineColorAndroid="white"
          />
        </View>
      </View>
    </ScrollView>
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
    zIndex: 2,
  },
});
