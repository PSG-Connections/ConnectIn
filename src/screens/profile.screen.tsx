/* eslint-disable react-native/no-inline-styles */
import {
  RefreshControl,
  SafeAreaView, ScrollView, View, Text, Image, Platform, Linking, TouchableOpacity, Button
} from 'react-native';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { User } from '../models/user.model';
import { UserContext } from '../contexts/user.context';
import { AuthContext } from '../contexts/auth.context';
import { GetLoggedInUserAPI, GetLoggedInUserResumeUrl, GetUserResumeUploadUrl, UploadAvatarAPI, UploadResumeToCloud } from '../apis/user.api';
import EducationTab from '../components/educationTab.component';
import Experience from '../components/experienceTab.component';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import ProfileHeader from '../components/profileHeader.component';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { axiosPut } from '../apis';

type NavProps = NativeStackScreenProps<any>;
export default function ProfileScreen ({ navigation }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userData, setUserData] = useState<User>();
  const [userResumeUrl, setUserResumeUrl] = useState<string>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      void (async () => {
        const resp = await getLoggedInUser();
        console.log('on refresh resp-->', resp);
        // handle errors
        userContext.SaveUserInContext(resp?.user);
        setUserData(resp?.user);
      })();
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    console.log('profile use effect called-->');
    // navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
    // console.log('useEffect 1 called ----->>');
    void (async () => {
      const resp = await getLoggedInUser();
      // handle errors
      userContext.SaveUserInContext(resp?.user);
      setUserData(resp?.user);
    })();
  }, []);

  const getUserResume = async () => {
    const accessToken = authContext.state.userToken;
    const resumeUrlResponse = await GetLoggedInUserResumeUrl({ accessToken });
    console.log('resume url--->', resumeUrlResponse);
    // handle errors
    const encodedUrl = encodeURIComponent(resumeUrlResponse?.url);
    const resumeUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodedUrl}`;
    setUserResumeUrl(resumeUrl);
  };
  const getLoggedInUser = async () => {
    console.log('in function --> getLoggedInUser');
    const accessToken = authContext.state.userToken;
    // await getUserResume();
    const resp = await GetLoggedInUserAPI({ accessToken });
    // handle errors
    return resp;
  };
  const handleChoosePhoto = async () => {
    await launchImageLibrary({ mediaType: 'photo' }, async (response: ImagePickerResponse) => {
      console.log(response);
      if (response.assets) {
        const photo = response.assets[0];
        const formdata = new FormData();
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const Imageuri: string | undefined = Platform.OS === 'android' ? photo?.uri : 'file://' + photo?.uri;
        formdata.append('image', {
          uri: Imageuri,
          type: photo?.type,
          name: 'image.png'
        } as unknown as string);
        formdata.append('name', photo?.fileName as string);
        formdata.append('type', photo?.type as string);
        const data: object = {
          formdata,
          accessToken: authContext.state.userToken
        };
        console.log('uploading image');
        const resp = await UploadAvatarAPI(data);
        if (!resp?.image_url) {
          // handle errors
        }
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const updatedUser: User = { ...userData } as User;
        updatedUser.profile_image_url = resp?.image_url;
        userContext.SaveUserInContext(updatedUser);
        setUserData(updatedUser);
        // console.log('resp--->', resp);
      }
    });
  };
  const handleUploadResume = async () => {
    try {
      const files: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], allowMultiSelection: false, presentationStyle: 'fullScreen', transitionStyle: 'coverVertical'
      });
      console.log('res : ' + JSON.stringify(files));
      console.log('fetching presigned url');
      const presignedUrl = await getPresignedUrl();
      console.log('presigned url --> ', presignedUrl);
      const file = files[0];
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      const Fileuri: string | undefined = Platform.OS === 'android' ? file?.uri : 'file://' + file?.uri;
      const formData = new FormData();
      formData.append('file', {
        // uri: Fileuri,
        name: file?.name,
        type: file?.type
      } as unknown as string);
      const resumeUploadResponse = UploadResumeToCloud({ presignedUrl, Fileuri });
      console.log(resumeUploadResponse);
      await getUserResume();
      // handle errors
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        console.log('Canceled from single doc picker');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const getPresignedUrl = async () => {
    const data = {
      accessToken: authContext.state.userToken
    };
    const resp = await GetUserResumeUploadUrl(data);
    // handle error
    return resp?.url;
  };
  return (
    <SafeAreaView className=" h-screen w-screen pb-12">
      <ScrollView className="flex flex-col" refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Cover & Profile Picture */}
        <ProfileHeader data={userData} handleChoosePhoto={handleChoosePhoto}/>
        <Button title='Update data' onPress={() => {
          navigation.navigate('UserUpdateScreen', userData);
        }}></Button>
        {/* Line */}
        <View className="bg-[#dbd9d9] h-[10px] w-full"></View>

        {/* Experience */}
        <View className="pt-5 pl-2 pb-2">
          <View className="flex flex-row ">
            <Text className="text-black font-black text-[20px] w-[70%] ">
              Experience
            </Text>
            <View className='flex flex-row justify-around'>
            <View className="w-[15%] flex items-center">
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/plus.png')}
              />
            </View>
            {userData?.UserExperience && userData?.UserExperience.length > 0 && <View className="w-[15%]  flex items-center">
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/edit.png')}
              />
            </View>}
            </View>
          </View>
          {userData?.UserExperience.map(item => (
            <Experience key={item.ID} data={item} />
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
            <View className='flex flex-row justify-around'>
            <View className="w-[15%] flex items-center">
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/plus.png')}
              />
            </View>
            {userData?.UserEducation && userData?.UserEducation.length > 0 && <View className="w-[15%]  flex items-center">
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/edit.png')}
              />
            </View>}
            </View>
          </View>
          {userData?.UserEducation.map((item) => (
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
            <View className='flex flex-row justify-around'>
            <View className="w-[15%] flex items-center">
            <TouchableOpacity onPress={() => {
              console.log('upload pressed');
              void (async () => {
                await handleUploadResume();
              })();
            }}>
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/plus.png')}
                />
            </TouchableOpacity>
            </View>
            <View className="w-[15%] flex items-center">
            <TouchableOpacity onPress={() => {
              console.log('upload pressed');
              void (async () => {
                // handle delete resume
              })();
            }}>
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/delete.png')}
                />
            </TouchableOpacity>
            </View>
            </View>
          </View>
          <View className='flex mt-5 justify-center pr-2'>
            <View className='flex  h-10  bg-blue-400 items-center'>
            <TouchableOpacity onPress={() => {
              console.log('View resume pressed');
              void (async () => {
                await Linking.openURL(userResumeUrl as string);
              })();
            }}>
              <View className='w-[100%] h-[100%] flex justify-center'>
                <Text className='text-black'>View Resume</Text>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Line */}
        <View className="bg-[#dbd9d9] h-[10px] w-full"></View>
      </ScrollView>

    </SafeAreaView>
  );
}
