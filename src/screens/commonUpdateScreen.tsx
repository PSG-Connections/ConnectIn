import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { USERUPDATE } from '../constants/common.constant';
import ExperienceTab from '../components/experienceTab.component';
import EducationTab from '../components/educationTab.component';
import { UserContext } from '../contexts/user.context';

type NavProps = NativeStackScreenProps<any>;
export default function CommonUserUpdateScreen ({ navigation, route }: NavProps) {
  const routeData = route.params;
  const userContext = useContext(UserContext);
  const [header, setHeader] = useState<string>('');
  const [userUpdateData, setUserUpdateData] = useState<any>();
  useEffect(() => {
    if (routeData?.type === USERUPDATE.TYPE_EDUCATION) {
      setHeader('Education');
      setUserUpdateData(userContext.userData.UserEducation);
    } else if ((routeData?.type === USERUPDATE.TYPE_EXPERIENCE)) {
      setHeader('Experience');
      setUserUpdateData(userContext.userData.UserExperience);
    }
  }, []);
  return (
        <SafeAreaView className='bg-slate-500 h-full w-full'>
            <ScrollView className='mx-5 mt-7'>
                <View className=''>
                    <Text className='text-white text-2xl'>{header}</Text>
                </View>
                <View className='flex mt-10 flex-row justify-between'>
                    <View className='flex'>
                        {
                            header === 'Education' &&
                            userUpdateData.map((item: any, index: any) => (
                                <View key={index} className='flex flex-row mb-2'>
                                    <View className='flex w-[80%] bg-white'>
                                        <EducationTab key={index} data={item}/>
                                    </View>
                                    <View className='bg-white flex w-[20%] justify-center items-end'>
                                        <TouchableOpacity className='w-[100%] items-end mr-5'
                                            hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                                            onPress={() => {
                                              console.log('upload pressed');
                                              navigation.navigate('UserEducationUpdateScreen', { data: item, type: USERUPDATE.TYPE_UPDATE }); // send params
                                            }}>
                                            <Image
                                                className="h-[25px] w-[25px]"
                                                source={require('../assets/edit.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                        {
                            header === 'Experience' &&
                            routeData?.data.map((item: any, index: any) => (
                                <View key={index} className='flex flex-row mb-2'>
                                    <View className='flex w-[80%] bg-white'>
                                        <ExperienceTab key={index} data={item}/>
                                    </View>
                                    <View className='bg-white flex w-[20%] justify-center items-end'>
                                        <TouchableOpacity className='w-[100%] items-end mr-5'
                                            hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                                            onPress={() => {
                                              console.log('upload pressed');
                                              navigation.navigate('UserExperienceUpdateScreen', { data: item, type: USERUPDATE.TYPE_UPDATE }); // send params
                                            }}>
                                            <Image
                                                className="h-[25px] w-[25px]"
                                                source={require('../assets/edit.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            ))
                        }
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
  );
}
