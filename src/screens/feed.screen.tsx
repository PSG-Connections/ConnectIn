/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
// /* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../contexts/user.context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import { clearEncryptedItemByKey } from '../helpers/utils';
import { AuthContext } from '../contexts/auth.context';

type NavProps = NativeStackScreenProps<any>;
export default function Feed ({ navigation, route }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const userImageUri = userContext.userData?.profile_image_url;
  const [modalVisible, setModalVisible] = useState(false);
  const deviceHeight = Dimensions.get('window').height;
  const handleOnPressLogOut = async () => {
    try {
      console.log('logout clearing session');

      await clearEncryptedItemByKey('user_session');
    } catch (error) {
      console.log(error);
    }
    authContext.dispatch({ type: 'SIGNED_OUT' });
  };
  return (
    <SafeAreaView className='h-screen'>
      <View className='h-[7%] bg-red-100 fixed flex flex-row justify-between'>
        <TouchableOpacity className='flex justify-center ml-[4%]' onPress={() => { setModalVisible(true); }}>
        <Image
              className="h-[40px] w-[40px] rounded-full"
              source={(userImageUri) ? { uri: userImageUri } : require('../assets/profile.png')}
            />
        </TouchableOpacity>
        <View className='flex justify-center mr-[4%]'>
          <Text className='text-black text-xl'>PSGLINKEDIN</Text>
        </View>
      </View>
      <Modal
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        deviceHeight={deviceHeight}
        // hasBackdrop={true}
        isVisible={modalVisible}
        onBackdropPress={() => { setModalVisible(false); }}
        onSwipeComplete={() => { setModalVisible(false); }}
        swipeDirection="left"
        backdropTransitionOutTiming={0}
        className='m-0'
      >
        <View className='h-full flex flex-row'>
          <View className='w-[65%] bg-white flex h-screen'>
            <Text className='text-black'>Welcome</Text>
            <View className="bg-red-400 flex items-center justify-center absolute bottom-0 w-full">
              <TouchableOpacity
                onPress={() => {
                  void (async () => {
                    await handleOnPressLogOut();
                  })();
                }}
                className='flex items-center'>
                <Text className="font-bold text-[#1079D9] pt-4 flex">Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity className='w-[35%] flex' onPress={() => { setModalVisible(false); }} activeOpacity={1}>
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView>
        <View className="h-screen bg-red-100 items-center justify-center">
          <Text className="text-black">Feed here ...............</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
