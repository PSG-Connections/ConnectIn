import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
  RefreshControl
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../contexts/auth.context';

import { GetLoggedInUserAPI, UploadAvatarAPI } from '../apis/user.api';
import { clearEncryptedItemByKey } from '../helpers/utils';
import { launchImageLibrary } from 'react-native-image-picker';
import Experience from '../components/experienceTab.component';
import { User } from '../models/user.model';
import { UserContext } from '../contexts/user.context';

const options: any = {
  title: 'Select Image',
  type: 'library',
  skipBackup: true,
  path: 'images',
  options: {
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: true
  }
};

export default function Profile (): JSX.Element {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userData, setUserData] = useState<User>();
  useEffect(() => {
    setUserData(userContext.userData);
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
  // const [avatar, setAvatar] = React.useState<any>();
  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    // console.log('---------------------->', JSON.stringify(images));
    console.log('Ass', images.assets?.[0]);
    const formData = new FormData();
    // console.log(''images.assets?.[0]);
    // let uri = images.assets?.[0].uri;
    // let type = images.assets?.[0].type;
    // let name = images.assets?.[0].fileName;
    // formData.append(
    //   'file',
    //   images.assets?.[0] as any,
    // {
    // uri,
    // type,
    // name,
    // }
    // );
    // const obj = {
    //   uri: images.assets?.[0].uri,
    //   type: images.assets?.[0].type,
    //   name: images.assets?.[0].fileName,
    // };
    // console.log('________________________________-OBJECT', obj);
    // formData.append('image', obj as any);
    // formData.append('image', images.assets?.[0] as any);
    // formData.append('type', images.assets?.[0].type as string);
    // formData.append('name', images.assets?.[0].fileName as string);
    formData.append('image', images.assets?.[0] as any, images.assets?.[0].uri);
    formData.append('type', images.assets?.[0].type as string);
    formData.append('name', images.assets?.[0].fileName as string);
    const accessToken = authContext.state.userToken;
    const response = await UploadAvatarAPI({ formData, accessToken });
    console.log('res', response);
    // let responseJson = await response.json();
    // console.log('resJson', responseJson);
  };

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
    <SafeAreaView className=" h-screen w-screen">
      <ScrollView className="flex flex-col" refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Cover & Profile Picture */}
        <View className="w-full bg-[#dbd9d9]  flex flex-row items-center justify-center">
          <View className="  translate-y-20 w-[25%] ">
            <Image
              className="h-[165px] w-[165px] rounded-full "
              source={require('../assets/profile.png')}
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
            <Button onPress={openGallery} title="Upload"></Button>
            <Text className="text-black font-black text-[20px]">{userData?.first_name} {userData?.last_name}</Text>
            {/* <Text className="text-black text-[16px] font-medium">MSc 2K19</Text> */}
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
            <View className="w-[15%] flex items-center justify-center">
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/plus.png')}
              />
            </View>
            <View className="w-[15%]  flex items-center justify-center">
              <Image
                className="h-[25px] w-[25px]  "
                source={require('../assets/edit.png')}
              />
            </View>
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

        <View className="">
          <TouchableOpacity
            onPress={() => {
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
