import React, { useContext, useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
  RefreshControl,
  Platform
} from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { GetLoggedInUserAPI, UploadAvatarAPI } from '../apis/user.api';
import { AuthContext } from '../contexts/auth.context';
import { UserContext } from '../contexts/user.context';
import { User, UserProfileProps } from '../models/user.model';
import EducationTab from './educationTab.component';
import Experience from './experienceTab.component';

export default function Profile (props: UserProfileProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userData, setUserData] = useState<User>();
  const [loggedInUser, setLoggedInuser] = useState<boolean>();
  useEffect(() => {
    setLoggedInuser(props.loggedInUser);
    setUserData(props.userDetails);
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      void (async () => {
        const resp = await getLoggedInUser();
        userContext.SaveUserInContext(resp?.user);
        setUserData(resp?.user);
      })();
      setRefreshing(false);
    }, 2000);
  }, []);
  const getLoggedInUser = async () => {
    const accessToken = authContext.state.userToken;
    const resp = await GetLoggedInUserAPI({ accessToken });
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
        const resp = await UploadAvatarAPI(data);
        console.log('resp--->', resp);
      }
    });
  };

  return (
    <SafeAreaView className=" h-screen w-screen">
      <ScrollView className="flex flex-col" refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Cover & Profile Picture */}
        <View className="w-full bg-[#dbd9d9]  flex flex-row items-center justify-center">
          <View className="  translate-y-20 w-[25%] pl-2">
            <Image
              className="h-[150px] w-[150px] rounded-full"
              source={(userData?.profile_image_url) ? { uri: userData?.profile_image_url } : require('../assets/profile.png')}
            />
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

        {/* Profile Main content */}
        <View className="pt-20 flex flex-col pb-2">
          <View className="pl-2 pt-5">
            {loggedInUser && <Button title="Upload" onPress={() => {
              void (async () => {
                await handleChoosePhoto();
              })();
            }}></Button>}
            <Text className="text-black font-black text-[20px]">{userData?.first_name} {userData?.last_name}</Text>
            <Text className="text-black text-[16px] font-medium">
              {userData?.headline}
            </Text>
            <Text className="text-black text-[16px] font-medium">
                {userData?.city}, {userData?.country}
            </Text>
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
            {loggedInUser && <View className='flex flex-row justify-around'>
            <View className="w-[15%] flex items-center">
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/plus.png')}
              />
            </View>
            <View className="w-[15%]  flex items-center">
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/edit.png')}
              />
            </View>
            </View>}
          </View>
          {userData?.UserExperience.map((item) => (
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
            {loggedInUser && <View className='flex flex-row justify-around'>
            <View className="w-[15%] flex items-center">
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/plus.png')}
              />
            </View>
            <View className="w-[15%]  flex items-center">
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/edit.png')}
              />
            </View>
            </View>}
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

      </ScrollView>
    </SafeAreaView>
  );
}
