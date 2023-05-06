/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

export default function ProfileHeader ({ data, handleChoosePhoto, loggedInUser, handleUserEditButtonClick }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <View className="w-full bg-[#dbd9d9]  flex flex-row items-center justify-center">
        <View className="translate-y-20 w-[25%] pl-2">
          <TouchableOpacity onPressOut={() => { setModalVisible(true); }} disabled={!loggedInUser}>
            <Image
              className="h-[130px] w-[130px] rounded-full"
              source={(data?.profile_image_url) ? { uri: data?.profile_image_url } : require('../assets/profile.png')}
            />
          </TouchableOpacity>
        </View>

        <View className="pt-10 h-full flex flex-col w-[65%]">
          <Text className="text-[#6C6C6C] opacity-40 text-[32px] font-bold text-center  ">
            Upload Cover{' '}
          </Text>
          <Text className="text-[#6C6C6C] opacity-40 text-[32px] font-bold text-center ">
            Photo{' '}
          </Text>
        </View>

        <View className=" w-[8%]  h-full  pt-2">
          <Image
            className="h-[36px] w-[36px]  "
            source={require('../assets/imgupload.png')}
          />
        </View>
      </View>
      <View className='flex flex-row w-full items-center'>
        <View className="pt-20 flex flex-col pb-2 w-[80%]">
          <View className="pl-2 pt-5">
            <Text className="text-black font-black text-[20px]">{data?.first_name} {data?.last_name}</Text>
            <Text className="text-black text-[16px] font-medium">
              {data?.headline}
            </Text>
              { data?.city !== '' && data?.country !== '' && <Text className="text-black text-[16px] font-medium">
                {data?.city}, {data?.country}
                </Text>}
          </View>
        </View>

        <View className='flex mt-20 pl-8 -translate-y-24'>
          <TouchableOpacity onPress={() => {
            void (async () => {
              await handleUserEditButtonClick();
            })();
          }}>
            <MaterialIcons name='edit' color='black' size={27}></MaterialIcons>
          </TouchableOpacity>
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
          <View className='h-[30%] bg-white flex rounded-t-[30px]'>
            <View className='flex h-screen flex-col items-center'>
              <View className='w-[35%] mt-5 mb-4 border-solid border-t-4 border-slate-600 rounded-full'>
              </View>
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
  );
}
