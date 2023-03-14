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
    <SafeAreaView className=' h-screen w-screen'>
      <ScrollView className='flex flex-col '>

        {/* Cover & Profile Picture */}
        <View className='w-full bg-[#dbd9d9]  flex flex-row items-center justify-center'>
          <View className='  translate-y-20 w-[25%] '>
            <Image
              className="h-[165px] w-[165px] rounded-full "
              source={require('../assets/profile.png')}
            />
          </View>
          
          <View className='pt-10 h-full flex flex-col w-[65%]'>
            <Text className='text-[#6C6C6C] opacity-40 text-[32px] font-bold text-center  '>Upload Cover </Text>  
            <Text className='text-[#6C6C6C] opacity-40 text-[32px] font-bold text-center '>Photo </Text>  
          </View>

          <View className=' w-[8%]  h-full  pt-2'>
            <Image
                className="h-[36px] w-[36px]  "
                source={require('../assets/imgupload.png')}
              />
          </View>
 
        </View>
        
        {/* Profile Main content */}
        <View className='pt-20 flex flex-col pb-2'> 
          <View className='pl-2 pt-5'>
            <Text className='text-black font-black text-[20px]'>Rishi</Text>
            <Text className='text-black text-[16px] font-medium'>MSc 2K19</Text>
            <Text className='text-black text-[16px] font-medium'>Grustl.inc</Text>
            <Text className='text-black text-[16px] font-medium'>Coimbatore, India</Text>
          </View>
        </View>

        {/* Line */}
        <View className='bg-[#dbd9d9] h-[10px] w-full'></View>

        {/* Experience */}
        <View className='pt-5 pl-2 pb-2'>
          <View className='flex flex-row '>
            <Text className='text-black font-black text-[20px] w-[70%] '>Experience</Text>
            <View className='w-[15%] flex items-center justify-center'>
              <Image
                  className="h-[25px] w-[25px]  "
                  source={require('../assets/plus.png')}
                />
            </View>
            <View className='w-[15%]  flex items-center justify-center'>
              <Image
                  className="h-[25px] w-[25px]  "
                  source={require('../assets/edit.png')}
                />
            </View>
          </View>

          <View className='flex flex-col gap-5 pt-10'>

            <View className='flex flex-row   gap-3'>
              <Image
                className="h-[45px] w-[50px]  "
                source={require('../assets/alixir.png')}
              />
              <View className='flex flex-col pl-2 text-black'>
                <Text className='text-black text-[13px] font-black '>Web Developer</Text>
                <Text className='text-black text-[11px] font-semibold'>Alixir . Internship</Text>
                <Text className='text-black text-[10px] font-medium'>Apr 2022 - jan 2023 10 mons</Text>
                <Text className='text-black text-[10px] font-medium'>Australia . Work From Home </Text>

              </View>
            </View>

            <View className='flex flex-row   gap-3'>
              <View className='rounded-full w-[50px] h-[50px] bg-[#D9D9D9] flex items-center justify-center'>
                <Image
                  className="h-[15px] w-[40px]  "
                  source={require('../assets/grustl.png')}
                />
              </View>
              <View className='flex flex-col pl-2 text-black'>
                <Text className='text-black text-[13px] font-black '>Front End Developer</Text>
                <Text className='text-black text-[11px] font-semibold'>Grustl.inc  . Full Time</Text>
                <Text className='text-black text-[10px] font-medium'>jan 2023 - Present</Text>
                <Text className='text-black text-[10px] font-medium'>Coimbatore, Tamil Nadu, India . On-Site </Text>

              </View>
            </View>

          </View>
          
        </View>

        {/* Line */}
        <View className='bg-[#dbd9d9] h-[10px] w-full'></View>
          
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
