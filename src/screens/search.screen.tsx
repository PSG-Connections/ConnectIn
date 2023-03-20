import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react';
import { View, Image, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Text } from 'react-native';

type NavProps = NativeStackScreenProps<any>;
export default function Search ({ navigation, route }: NavProps): JSX.Element {
  const handleOnSubmit = async (values: any) => {
  };
  return (
    <SafeAreaView className=" h-screen w-screen">
     <ScrollView className="flex flex-col">
      <View className="flex items-center mt-12">
        <Formik
          initialValues={{ email: '' }}
          onSubmit={handleOnSubmit}>
          {({ handleChange, handleSubmit, values }) => (
            <View className="w-[80%] flex flex-row gap-5 items-center justify-center">
              <TextInput
                className="bg-gray-300 w-full rounded-full pl-4 text-black"
                placeholder="Search"
                keyboardType="default"
                onChangeText={handleChange('email')}
                value={values.email}
                placeholderTextColor={'black'}
              />
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}
                className="">
                <Image className='h-[25px] w-[25px]' source={require('../assets/plus.png')}/>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', {
                isLoggedInUser: false
              });
            }}>
            <Text className="font-bold text-[#1079D9] pt-4">Test screen</Text>
          </TouchableOpacity> */}
      </View>
      <View className='flex items-center'>
        <View className='w-[80%] flex flex-row mt-14 bg-slate-400'>
          <View className='flex'>
            <Image className='h-[50px] w-[50px]' source={require('../assets/alixir.png')}/>
          </View>
          <View className='flex flex-col'>
            <Text className='text-black'>Rishi S</Text>
            <Text className='text-black'>Developer at Grustl</Text>
          </View>
        </View>
      </View>
      <View className='flex items-center'>
        <View className='w-[80%] flex flex-row mt-14 bg-slate-400'>
          <View className='flex'>
            <Image className='h-[50px] w-[50px]' source={require('../assets/alixir.png')}/>
          </View>
          <View className='flex flex-col'>
            <Text className='text-black'>Rishikhesh A</Text>
            <Text className='text-black'>Buidl at Cypher Wallet</Text>
          </View>
        </View>
      </View>
      <View className='flex items-center'>
      <TouchableOpacity
                onPress={() => {
                }}
                className="">
                <Text className=' text-blue-700'>See more...</Text>
              </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>

  );
}
