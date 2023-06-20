/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

export default function ProfileHeader ({ data, handleChoosePhoto, loggedInUser, handleUserEditButtonClick }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
      <SafeAreaView className='w-full'>
        <View className=''>
          <View className="z-10">
            <View className=' flex h-[150px] bg-slate-100'>
                {/* <Image
                      resizeMode='stretch'
                      className="h-full w-full flex"
                      source={require('../assets/psg_background.jpg')}
                  /> */}
            </View>
            <View className="absolute top-[80px] w-[40%] h-[100%]">
                <TouchableOpacity className='flex justify-center items-center' disabled={!loggedInUser} onPress={() => { setModalVisible(true); }}
                >
                <Image
                      className="h-[130px] w-[130px] rounded-full flex"
                      source={(data?.profile_image_url) ? { uri: data?.profile_image_url } : require('../assets/profile.png')}
                  />
                </TouchableOpacity>
            </View>
          </View>
          {loggedInUser && <View className='flex w-full items-end pr-3 pt-4 bg-[#03001C] z-0'>
              <TouchableOpacity disabled={!loggedInUser} onPress={() => {
                void (async () => {
                  await handleUserEditButtonClick();
                })();
              }}>
                <MaterialIcons name='edit' color='white' size={27}></MaterialIcons>
              </TouchableOpacity>
            </View>}
          <View className={`flex flex-row w-full items-center bg-[#03001C] ${!loggedInUser ? 'pt-14' : 'pt-4'}`}>
            <View className="flex flex-col pb-2 w-[80%]">
              <View className="pl-2 pt-5">
                <Text className="text-white font-black text-[20px]">{data?.first_name} {data?.last_name}</Text>
                <Text className="text-white text-[16px] font-medium">
                  {data?.headline}
                </Text>
                  { data?.city !== '' && data?.country !== '' && <Text className="text-black text-[16px] font-medium">
                    {data?.city}, {data?.country}
                    </Text>}
              </View>
            </View>
          </View>
          <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            // hasBackdrop={true}
            isVisible={modalVisible}
            onBackdropPress={() => { setModalVisible(false); }}
            onSwipeComplete={() => { setModalVisible(false); }}
            swipeDirection='down'
            backdropTransitionOutTiming={0}
            className='m-0'
          >
            <View className='w-full flex flex-col'>
              <TouchableOpacity className='h-[70%] flex' onPress={() => { setModalVisible(false); }} activeOpacity={1}>
              </TouchableOpacity>
              <View className='h-[30%] bg-[#03001C] flex rounded-t-[30px]'>
                <View className='flex h-screen flex-col items-center'>
                  <View className='w-[35%] mt-5 mb-4 border-solid border-t-4 border-slate-600 rounded-full'>
                  </View>
                  <View className='flex flex-row'>
                    <View className='flex w-[30%] items-center justify-center'>
                      <Image
                        className="h-[100px] w-[100px] rounded-full flex"
                        source={(data?.profile_image_url) ? { uri: data?.profile_image_url } : require('../assets/profile.png')}
                      />
                    </View>
                    <View className='flex w-[70%]'>
                      <View className="bg-blue-500 mt-4 flex items-center h-[45px] justify-center rounded-full w-[95%] mx-2">
                        <TouchableOpacity
                          onPress={() => {
                          }}
                          className='flex items-center justify-center'>
                          <Text className="font-bold text-white flex">View Photo</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="bg-blue-500 flex mt-4 items-center h-[45px] justify-center rounded-full w-[95%] mx-2">
                        <TouchableOpacity
                        onPress={() => {
                          console.log('upload pressed');
                          void (async () => {
                            await handleChoosePhoto();
                          })();
                        }}
                          className='flex items-center justify-center'>
                          <Text className="font-bold text-white flex">Edit Photo</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View className="bg-red-600 flex mt-4 items-center h-[45px] justify-center rounded-full w-[95%] mx-2">
                    <TouchableOpacity
                      onPress={() => {
                      }}
                      className='flex items-center justify-center'>
                      <Text className="font-bold text-white flex">Remove Photo</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>
          </Modal>
        </View>
      </SafeAreaView>
  );
}
