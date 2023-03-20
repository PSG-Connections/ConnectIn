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
                className="bg-[#6DB9FF] w-full rounded-full pl-4 text-black font-black text-[24px]  "
                placeholder="Ris"
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
      <View className='flex flex-col items-center justify-center pt-20 gap-5'>

        {/* Person 1 component */}
        <View className='w-[80%] h-[84px] flex flex-row bg-[#D9D9D9] rounded-3xl items-center justify-center'>
            <View className='w-[5%]'>

            </View>
            <View className='w-[20%]'>
              <Image className='h-[50px] w-[50px]' source={require('../assets/search.png')}/>
            </View>
            <View className='w-[70%] flex flex-col'>
              <Text className='text-[20px] font-black text-black'>Rishi S</Text>
              <Text className='text-[12px] font-black text-[#6C6C6C]'>you . Developer at Grustl</Text>
            </View>
            <View className='w-[5%]'>

            </View>
        </View>

        {/* Person 2 component */}
        <View className='w-[80%] h-[84px] flex flex-row bg-[#D9D9D9] rounded-3xl items-center justify-center'>
            <View className='w-[5%]'>

            </View>
            <View className='w-[20%]'>
              <Image className='h-[50px] w-[50px]' source={require('../assets/search2.png')}/>
            </View>
            <View className='w-[70%] flex flex-col'>
              <Text className='text-[20px] font-black text-black'>Rishikhesh A</Text>
              <Text className='text-[12px] font-black text-[#6C6C6C]'>BUILD at Cypher Wallet (YC W22)</Text>
            </View>
            <View className='w-[5%]'>

            </View>
        </View>

        {/* Person 3 component */}
        <View className='w-[80%] h-[84px] flex flex-row bg-[#D9D9D9] rounded-3xl items-center justify-center'>
            <View className='w-[5%]'>

            </View>
            <View className='w-[20%]'>
              <Image className='h-[50px] w-[50px]' source={require('../assets/search5.png')}/>
            </View>
            <View className='w-[70%] flex flex-col'>
              <Text className='text-[20px] font-black text-black'>Rishab K</Text>
              <Text className='text-[12px] font-black text-[#6C6C6C]'> Position at Company</Text>
            </View>
            <View className='w-[5%]'>

            </View>
        </View>
      </View>
      {/* <View className='flex items-center'>
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
      </View> */}
      <View className='flex items-center pt-10 pb-5'>
        <TouchableOpacity
                onPress={() => {
                }}
                className="">
                <Text className=' text-[#1079D9] text-[18px] font-black'>See more...</Text>
              </TouchableOpacity>
      </View>
      <View className='w-full h-2 bg-[#6DB9FF]'></View>
    </ScrollView>
    </SafeAreaView>

  );
}
