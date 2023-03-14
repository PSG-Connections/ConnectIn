import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { AuthContext } from '../contexts/auth.context';
import { clearEncryptedItemByKey } from '../helpers/utils';

export default function Profile (): JSX.Element {
  const authContext = useContext(AuthContext);
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
    <SafeAreaView className=''>
      <ScrollView className=''>
        <View className=''>
          <View className=''>
            <Image className='' resizeMode='stretch' source={require('../assets/loginScreen.png')}/>
          </View>
          <View className=''>
            <View className=''>
              <Image resizeMode='contain' className='' source={require('../assets/profileReplace.png')}/>
            </View>
            <View className=''>
              <Text className='text-black'>Rishi S</Text>
              <Text className='text-black'>MSC TCS 2k19</Text>
              <Text className='text-black'>Grustl Inc</Text>
              <Text className='text-black'>Coimbatore, India</Text>
            </View>
          </View>
        </View>
        <View className='mt-10'>
          <Text className='text-black'>Experience</Text>
          <View>
            <View>
              {/* added a dummy image for company logo */}
              <Image source={require('../assets/loginScreen.png')}/>
            </View>
            <View>
              <Text className='text-black'>Web Developer</Text>
              <Text className='text-black'>Alixir Internship</Text>
              <Text className='text-black'>Apr 2022 - Jan 2023 10 Mons</Text>
              <Text className='text-black'>Australia work from home</Text>
            </View>
          </View>
          <View>
            <View>
              {/* added a dummy image for company logo */}
              <Image source={require('../assets/loginScreen.png')}/>
            </View>
            <View>
              <Text className='text-black'>Web Developer</Text>
              <Text className='text-black'>Alixir Internship</Text>
              <Text className='text-black'>Apr 2022 - Jan 2023 10 Mons</Text>
              <Text className='text-black'>Australia work from home</Text>
            </View>
          </View>
        </View>
        <View className=''>
          <TouchableOpacity onPress={() => {
            void (async () => {
              await handleOnPressLogOut();
            })();
          }}>
          <Text className="font-bold text-[#1079D9] pt-4">Log Out</Text>
          </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
