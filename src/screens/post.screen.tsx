import React, { useContext, useState } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity,
  Image, ScrollView, TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../contexts/user.context';

export default function PostScreen ({ navigation }: any): JSX.Element {
  const userContext = useContext(UserContext);
  const [enablePostButton, setEnablePostButton] = useState(false);
  const [postTextContent, setPostTextContent] = useState('');
  const [postViewType] = useState('Anyone');
  const [postCommentsType, setPostCommentsType] = useState(true);
  const handleOnPost = async () => {
    // handle post
  };
  return (
    <SafeAreaView className='bg-slate-600 h-full w-full'>
      <View className='mx-4 mt-3 h-full'>
        {/* Fixed Header */}
        <View className='flex flex-row justify-between h-[40px] fixed items-center'>
            <View className='flex'>
                {/* CLose Button */}
                <Ionicons name='close' color='white' size={35} onPress={() => {
                  navigation.goBack();
                }}></Ionicons>
            </View>
            <View className={`mr-[10px] ${enablePostButton ? 'bg-blue-500' : 'bg-slate-400'} rounded-full w-[60px] h-[35px] flex justify-center items-center`}>
              <TouchableOpacity
              className='flex justify-center'
              disabled={!enablePostButton}
               onPress={() => {
                 void (async () => {
                   await handleOnPost();
                 })();
               }}>
                <Text className='text-white'>Post</Text>
              </TouchableOpacity>
            </View>
        </View>

        <ScrollView className='mt-6'>
          {/* profile image with name */}
          <View className='flex flex-row'>
              <View className='flex'>
                <Image
                      className="h-[60px] w-[60px] rounded-full flex"
                      source={(userContext.userData?.profile_image_url) ? { uri: userContext.userData?.profile_image_url } : require('../assets/profile.png')}
                    />
              </View>
              <View className='flex flex-col ml-5 justify-around'>
                <Text className='text-white'>{userContext.userData?.first_name} {userContext.userData?.last_name}</Text>
                <View className='border-solid border-slate-300 border-2 rounded-xl px-2 flex flex-row'>
                  <Text className='mr-2 text-white'>{postViewType}</Text>
                  <Ionicons name='ios-caret-down' color='white' size={20}></Ionicons>
                </View>
              </View>
          </View>
          <View>
            <TextInput className='text-white'
              multiline={true}
              value={postTextContent}
              onChangeText={(value) => {
                console.log('value entered', value);
                setPostTextContent(value);
                if (value.length >= 4) {
                  setEnablePostButton(true);
                } else {
                  setEnablePostButton(false);
                }
              }}
              placeholder='What do you want to talk about?'
              placeholderTextColor={'#ffffff'}
              underlineColorAndroid='transparent'
            />
          </View>
        </ScrollView>

        {/* fixed bottom */}
        <View className='flex flex-row h-[60px] w-full fixed bottom-0 mt-2'>
            <View className='flex flex-row justify-between w-[40%] pl-2'>
              <TouchableOpacity className='flex'
                onPress={() => {

                }}
              >
                <Ionicons name='camera' color='white' size={25}></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity className='flex'
                onPress={() => {

                }}
              >
                <Ionicons name='videocam' color='white' size={25}></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity className='flex'
                onPress={() => {

                }}
              >
                <Ionicons name='image-outline' color='white' size={25}></Ionicons>
              </TouchableOpacity>
            </View>
            <View className='flex w-[30%]'></View>
            <View className='flex w-[30%] pr-3 mt-1'>
              <TouchableOpacity className='flex flex-row justify-end items-center' disabled={true} onPress={() => {
                setPostCommentsType(!postCommentsType);
              }}>
                <MaterialCommunityIcons name={`${postCommentsType ? 'comment-outline' : 'comment-off-outline'}`} color='white' size={17}></MaterialCommunityIcons>
                <Text className='ml-1 text-[15px] text-white'>
                  {postCommentsType ? 'Comments' : 'No one'}
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </SafeAreaView>

  );
}
