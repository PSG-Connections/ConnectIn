/* eslint-disable react-native/no-inline-styles */
import {
  RefreshControl,
  SafeAreaView, ScrollView, View, Text, Linking, TouchableOpacity
} from 'react-native';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { User } from '../models/user.model';
import { UserContext } from '../contexts/user.context';
import { AuthContext } from '../contexts/auth.context';
import { GetSearchUserByEmail } from '../apis/user.api';
import EducationTab from './educationTab.component';
import Experience from './experienceTab.component';
import ProfileHeader from './profileHeader.component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { axiosPut } from '../apis';

type NavProps = NativeStackScreenProps<any>;
export default function UserProfile ({ navigation, route }: NavProps): JSX.Element {
  const routeData = route.params;
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userData, setUserData] = useState<User>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      void (async () => {
        const resp = await getUserByEmail(routeData?.email);
        console.log('on refresh resp-->', resp);
        // handle errors
        userContext.SaveUserInContext(resp?.user);
        setUserData(resp?.user);
      })();
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    console.log('emial -->', routeData?.email);
    void (async () => {
      const resp = await getUserByEmail(routeData?.email);
      console.log(resp);

      // handle errors
      setUserData(resp?.user);
    })();
    console.log('user---->>', userData);
  }, []);

  // const getUserResume = async () => {
  //   const accessToken = authContext.state.userToken;
  //   const resumeUrlResponse = await GetLoggedInUserResumeUrl({ accessToken });
  //   console.log('resume url--->', resumeUrlResponse);
  //   // handle errors
  //   const encodedUrl = encodeURIComponent(resumeUrlResponse?.url);
  //   const resumeUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodedUrl}`;
  //   setUserResumeUrl(resumeUrl);
  // };
  const getUserByEmail = async (email: string) => {
    console.log('in function --> getotheruserprofile');
    const accessToken = authContext.state.userToken;
    const resp = await GetSearchUserByEmail({ accessToken, email });
    // handle errors
    return resp;
  };
  return (
      <SafeAreaView className=" h-screen w-screen pb-12">
        <ScrollView className="flex flex-col" refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* Cover & Profile Picture */}
          <ProfileHeader data={userData} handleChoosePhoto={null} loggedInUser={false}/>

          {/* Line */}
          <View className="bg-[#dbd9d9] h-[10px] w-full"></View>

          {/* follow */}
          <View className='flex flex-row w-full my-3 pr-2'>
            <View className='flex w-[45%] items-center h-[33px]'>
              <TouchableOpacity className=' flex w-[95%] bg-blue-600 flex-row justify-center h-full items-center rounded-3xl'>
              <MaterialCommunityIcons name='plus' color='white' size={18}></MaterialCommunityIcons>
                <Text className='ml-1 text-md text-white'>Follow</Text>
              </TouchableOpacity>
            </View>
            <View className='flex w-[45%] items-center h-[33px]'>
              <TouchableOpacity className=' flex w-[95%] border-2 border-blue-600 flex-row justify-center h-full items-center rounded-3xl'>
              <MaterialCommunityIcons name='shield-lock-outline' color='#2563EB' size={18}></MaterialCommunityIcons>
                <Text className='text-blue-600 ml-1 text-md'>Message</Text>
              </TouchableOpacity>
            </View>
            <View className='flex w-[10%] items-center h-[33px]'>
              <TouchableOpacity className=' flex w-full h-full flex-row justify-center items-center rounded-3xl border-2 border-slate-500'>
                <View className='flex h-full items-center justify-center'>
                  <Text className=' text-slate-600 grid align-middle pb-2 text-[15px]'>...</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Line */}
          <View className="bg-[#dbd9d9] h-[10px] w-full"></View>

          {/* Experience */}
          <View className="pt-5 pl-2 pb-2">
            <View className="flex flex-row ">
              <Text className="text-black font-black text-[20px] w-[70%] ">
                Experience
              </Text>
            </View>
            {userData?.UserExperience && userData?.UserExperience.length > 0 &&
            userData?.UserExperience.map((item) => (
              <Experience
                key={item.ID}
                data={item}
              />
            ))}
          </View>

          {/* Line */}
          <View className="bg-[#dbd9d9] h-[10px] w-full"></View>

          {/* Education */}
          <View className="pt-5 pl-2 pb-2">
            <View className="flex flex-row ">
              <Text className="text-black font-black text-[20px] w-[70%] ">
                Education
              </Text>
            </View>
            {userData?.UserEducation && userData?.UserEducation.length > 0 &&
            userData?.UserEducation.map((item) => (
              <EducationTab
                key={item.user_id}
                data={item}
              />
            ))}
          </View>

          {/* Line */}
          <View className="bg-[#dbd9d9] h-[10px] w-full"></View>

          {/* Resume */}
          <View className="pt-5 pl-2 mb-4">
            <View className="flex flex-row ">
              <Text className="text-black font-black text-[20px] w-[70%] ">
                Resume
              </Text>
            </View>
            <View className='flex mt-5 justify-center pr-2'>
              <TouchableOpacity onPress={() => {
                console.log('View resume pressed');
                void (async () => {
                  await Linking.openURL(userData?.resume_url as string);
                })();
              }}>
              <View className='flex  h-10 border-2 rounded-3xl border-blue-400 items-center'>
                <View className='w-[100%] h-[100%] flex justify-center items-center'>
                  <Text className='text-blue-400'>View Resume</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Line */}
          <View className="bg-[#dbd9d9] h-[10px] w-full"></View>
        </ScrollView>

      </SafeAreaView>
  );
}
