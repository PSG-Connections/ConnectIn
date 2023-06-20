import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../contexts/user.context';

type NavProps = NativeStackScreenProps<any>;
export default function SettingsScreen ({ navigation, route }: NavProps): JSX.Element {
  const userContext = useContext(UserContext);
  const userImageUri = userContext.userData?.profile_image_url;

  return (
        <SafeAreaView className='h-full bg-[#03001C]'>
            {/* Headers */}
            <View className='flex justify-center h-[8%] '>
                <View className='flex flex-row h-[40px] fixed items-center'>
                    <View className='flex w-[15%] items-center'>
                        {/* CLose Button */}
                        <View className='flex'>
                            <Ionicons name='arrow-back' color='white' size={30} onPress={() => {
                              navigation.goBack();
                            }}></Ionicons>
                        </View>
                    </View>
                    <View className='flex ml-3 w-[85%]'>
                        <Text className='text-[23px] text-white'>Settings</Text>
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView className='flex mt-4'>
                {/* user details */}
                <View className='flex mr-2 ml-4'>
                    <View className='flex'>
                        <Image
                            className="h-[80px] w-[80px] rounded-full"
                            source={(userImageUri) ? { uri: userImageUri } : require('../assets/profile.png')}
                        />
                        {/* <Text className='flex text-[20px]'>{userContext.userData?.first_name} {userContext.userData?.last_name}</Text> */}
                    </View>
                </View>

                {/* Preferences */}
                <View className='flex mt-[20px] mr-2 ml-4 mb-[20px]'>
                    <Text className='text-[15px]'>Preferences</Text>
                    <View className='flex flex-col mt-3'>
                        <TouchableOpacity className='flex flex-row items-center'>
                            <Ionicons name='notifications' color='white' size={30}></Ionicons>
                            <Text className='ml-3 text-[18px]'>Notifications</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex flex-row items-center mt-4'>
                            <MaterialCommunityIcons name='security' color='white' size={30}></MaterialCommunityIcons>
                            <Text className='ml-3 text-[18px]'>Privacy and Security</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex flex-row items-center mt-4'>
                            <MaterialIcons name='chat' color='white' size={30}></MaterialIcons>
                            <Text className='ml-3 text-[18px]'>Chats</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Line */}
                <View className='h-[1px] bg-slate-300 mx-0'></View>

                {/* Others */}
                <View className='flex mr-2 ml-4 my-[20px]'>
                    <Text className='text-[15px]'>More info and support</Text>
                    <View className='flex flex-col mt-3'>
                        <TouchableOpacity className='flex flex-row items-center'>
                            <Ionicons name='ios-help-circle-outline' color='white' size={30}></Ionicons>
                            <Text className='ml-3 text-[18px]'>Help</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex flex-row items-center mt-4'>
                            <MaterialIcons name='report-problem' color='white' size={30}></MaterialIcons>
                            <Text className='ml-3 text-[18px]'>Report a problem</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex flex-row items-center mt-4'>
                            <MaterialIcons name='info-outline' color='white' size={30}></MaterialIcons>
                            <Text className='ml-3 text-[18px]'>About</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Line */}
                <View className='h-[1px] bg-slate-300  mx-0'></View>
            </ScrollView>
            {/* Bottom */}
            <View className='fixed bottom-0 items-center'>
                {/* <Text className='flex text-[17px]'>PSG  ❤️</Text> */}
            </View>
        </SafeAreaView>
  );
}
