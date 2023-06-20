/* eslint-disable react-native/no-inline-styles */
import {
  RefreshControl,
  SafeAreaView, ScrollView, View, Text, Platform, Linking, TouchableOpacity, FlatList
} from 'react-native';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { User } from '../models/user.model';
import { UserContext } from '../contexts/user.context';
import { AuthContext } from '../contexts/auth.context';
import { DeleteLoggedInUserResume, GetLoggedInUserAPI, GetUserResumeUploadUrl, UploadAvatarAPI } from '../apis/user.api';
import EducationTab from '../components/educationTab.component';
import ExperienceTab from '../components/experienceTab.component';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileHeader from '../components/profileHeader.component';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { emitter } from '../constants/events';
import { USERUPDATE } from '../constants/common.constant';
import PostContent from '../components/postContent.component';
import { Post } from '../models/post.model';
import { GetUserPostsByEmail } from '../apis/post.api';
import { UploadBlobToCloud } from '../apis';
import { getGoogleDocsPDFURL } from '../helpers/utils';

// import { useFocusEffect } from '@react-navigation/native';
// import { axiosPut } from '../apis';

type NavProps = NativeStackScreenProps<any>;
export default function ProfileScreen ({ navigation }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  // useFocusEffect(() => {
  //   console.log('screen - profile focussed');
  //   // do any re-fetching or re-rendering here
  // });
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    setUserData(undefined);
    setTimeout(() => {
      void (async () => {
        const resp = await getLoggedInUser();
        console.log('on refresh resp-->', resp);
        // handle errors

        setUserData(resp?.user);
        userContext.SaveUserInContext(resp?.user);
        setOffset(0);
      })();
      setIsLoading(false);
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    console.log('profile use effect called-->');
    const handleUserUpdated = (updatedUser: any) => {
      setUserData(updatedUser);
    };

    // Listen for the userUpdated event and update the state
    emitter.on('userUpdated', handleUserUpdated);

    setUserData(userContext.userData);

    setIsLoading(false);

    // Cleanup the event listener when the component unmounts
    return () => {
      emitter.off('userUpdated', handleUserUpdated);
    };
  }, []);

  useEffect(() => {
    // fetch user posts
    void (async () => {
      await getUserPosts();
    })();
  }, [offset]);

  const getUserPosts = async () => {
    const accessToken = authContext.state.userToken;
    const requestData = {
      accessToken,
      email: userContext.userData?.email,
      limit,
      offset
    };
    console.log('calling get posts api--->', requestData);
    const resp = await GetUserPostsByEmail(requestData);
    console.log('get post api response--->', resp);
    if (resp?.error) {
      // handle errors
    }
    if (offset === 0) {
      setPosts(resp?.posts);
    } else {
      setPosts((prevState) => {
        return [...prevState, ...resp?.posts];
      });
    }
  };
  // const getUserResume = async () => {
  //   console.log('resume url--->', userData?.resume_url);
  //   // handle errors
  //   const encodedUrl = encodeURIComponent(userData?.resume_url as string);
  //   const resumeUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodedUrl}`;
  //   setUserResumeUrl(resumeUrl);
  // };
  const getLoggedInUser = async () => {
    console.log('in function --> getLoggedInUser');
    const accessToken = authContext.state.userToken;
    // await getUserResume();
    const resp = await GetLoggedInUserAPI({ accessToken });
    // handle errors
    return resp;
  };
  const handleUserEditButtonClick = async () => {
    navigation.navigate('UserUpdateScreen', userData);
  };

  const handleRemovePost = async (id: number) => {
    const filteredData = posts.filter(item => item.id !== id);
    setPosts(filteredData);
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

  const handlePostEndReached = () => {
    setOffset((prevState) => (prevState + limit));
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
      const resumeUploadResponse = UploadBlobToCloud({ presignedUrl, Fileuri, contentType: 'application/pdf' });
      console.log(resumeUploadResponse);
      // await getUserResume();
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
  const handleDeleteResume = async () => {
    const resp = await DeleteLoggedInUserResume({ accessToken: authContext.state.userToken });
    console.log('delete resume resp-->', resp);
    if (resp?.error) {
      // handle error
    } else {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const updatedUser: User = { ...userData } as User;
      updatedUser.resume_url = '';
      userContext.SaveUserInContext(updatedUser);
      setUserData(updatedUser);
    }
  };
  return (
    <SafeAreaView className=" h-screen w-screen pb-12">
      <View className=''>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              className='bg-[#404258]'
              data={posts}
              ListHeaderComponent={() => {
                return (
                 <>
                  {!isLoading && <ScrollView className="flex flex-col bg-[#03001C]"
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                  >

                    {/* Cover & Profile Picture */}
                    <ProfileHeader data={userData} handleChoosePhoto={handleChoosePhoto} loggedInUser={true} handleUserEditButtonClick={handleUserEditButtonClick}/>

                    {/* <Button title='Update data' onPress={() => {
                      navigation.navigate('UserUpdateScreen', userData);
                    }}></Button> */}

                    {/* Line */}
                    <View className="bg-[#dbd9d9] h-[1px] w-full"></View>

                    {/* Experience */}
                    <View className="pt-5 pl-2 pb-2 bg-[#03001C]">
                      <View className="flex flex-row ">
                        <View className='flex w-[70%]'>
                          <Text className="text-white font-black text-[20px]">
                            Experience
                          </Text>
                        </View>
                        <View className='flex flex-row justify-around w-[30%]'>
                        <View className="flex items-center">
                        <TouchableOpacity className='w-[100%]'
                              hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                              onPress={() => {
                                console.log('upload pressed');
                                navigation.navigate('UserExperienceUpdateScreen', { type: USERUPDATE.TYPE_CREATE, data: {} });
                              }}>
                          <Feather name='plus-circle' color='white' size={25}></Feather>
                        </TouchableOpacity>
                        </View>
                        {userData?.UserExperience && userData?.UserExperience.length > 0 &&
                        <View className="flex items-center">
                          <TouchableOpacity className='w-[100%]'
                            hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                            onPress={() => {
                              console.log('upload pressed');
                              navigation.navigate('CommonUserUpdateScreen', {
                                type: USERUPDATE.TYPE_EXPERIENCE,
                                data: userData?.UserExperience
                              }); // send params
                            }}>
                            <MaterialIcons name='edit' color='white' size={27}></MaterialIcons>
                          </TouchableOpacity>
                        </View>}
                        </View>
                      </View>
                      {userData?.UserExperience && userData?.UserExperience.length > 0 &&
                      userData?.UserExperience.map((item: any) => (
                        <ExperienceTab key={item.ID} data={item} />
                      ))}
                    </View>

                    {/* Line */}
                    <View className="bg-[#dbd9d9] h-[1px] w-full"></View>

                    {/* Education */}
                    <View className="pt-5 pl-2 pb-2">
                      <View className="flex flex-row">
                        <View className='flex w-[70%]'>
                          <Text className="text-white font-black text-[20px]">
                            Education
                          </Text>
                        </View>
                        <View className='flex flex-row justify-around w-[30%]'>
                          <View className="flex items-center">
                            <TouchableOpacity className='w-[100%]'
                              hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                              onPress={() => {
                                console.log('upload pressed');
                                navigation.navigate('UserEducationUpdateScreen', { type: USERUPDATE.TYPE_CREATE, data: {} });
                              }}>
                              <Feather name='plus-circle' color='white' size={25}></Feather>
                            </TouchableOpacity>
                        </View>
                        {userData?.UserEducation && userData?.UserEducation.length > 0 &&
                          <View className="flex items-center">
                            <TouchableOpacity
                              hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                              onPress={() => {
                                console.log('upload pressed');
                                navigation.navigate('CommonUserUpdateScreen', {
                                  type: USERUPDATE.TYPE_EDUCATION,
                                  data: userData?.UserEducation
                                }); // send params
                              }}>
                              <MaterialIcons name='edit' color='white' size={27}></MaterialIcons>
                            </TouchableOpacity>
                          </View>}
                        </View>
                      </View>
                      {userData?.UserEducation && userData?.UserEducation.length > 0 &&
                      userData?.UserEducation.map((item: any) => (
                        <EducationTab
                          key={item?.ID}
                          data={item}
                        />
                      ))}
                    </View>

                    {/* Line */}
                    <View className="bg-[#dbd9d9] h-[1px] w-full"></View>

                    {/* Resume */}
                    <View className="pt-5 pl-2 mb-4">
                      <View className="flex flex-row">
                        <View className='flex w-[70%]'>
                          <Text className="text-white font-black text-[20px]">
                            Resume
                          </Text>
                        </View>
                        <View className='flex flex-row justify-around w-[30%]'>
                          <View className="flex items-center">
                            <TouchableOpacity
                            hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                             onPress={() => {
                               console.log('upload pressed');
                               void (async () => {
                                 await handleUploadResume();
                               })();
                             }}>
                            {userData?.resume_url && userData.resume_url !== ''
                              ? <Feather name='plus-circle' color='white' size={25}></Feather>
                              : <MaterialIcons name='edit' color='white' size={27}></MaterialIcons>
                            }
                            </TouchableOpacity>
                        </View>
                        {userData?.resume_url && userData.resume_url !== '' &&
                          <View className="flex items-center">
                            <TouchableOpacity className='w-[100%]'
                            hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                            onPress={() => {
                              console.log('delete pressed');
                              void (async () => {
                                await handleDeleteResume();
                              })();
                            }}>
                            <MaterialIcons name='delete' color='white' size={27}></MaterialIcons>
                            </TouchableOpacity>
                        </View>}
                        </View>
                      </View>
                      {userData?.resume_url && userData.resume_url !== '' && <View className='flex mt-5 justify-center pr-2'>
                        <TouchableOpacity onPress={() => {
                          console.log('View resume pressed');
                          void (async () => {
                            await Linking.openURL(await getGoogleDocsPDFURL(userData?.resume_url));
                          })();
                        }}>
                        <View className='flex  h-10 border-2 rounded-3xl border-blue-400 items-center'>
                          <View className='w-[100%] h-[100%] flex justify-center items-center'>
                            <Text className='text-blue-400'>View Resume</Text>
                          </View>
                        </View>
                        </TouchableOpacity>
                      </View>}
                    </View>

                    {/* Line */}
                    <View className="bg-[#dbd9d9] h-[1px] w-full"></View>

                    {/* Posts */}
                    <View className="pt-5 pl-2 mb-4 pr-2">
                      <View className="flex flex-row ">
                        <Text className="text-white font-black text-[20px] w-[70%] ">
                          Posts
                        </Text>
                      </View>
                    </View>

                  </ScrollView>}
                 </>
                );
              }}
              renderItem={({ item }) => {
                return (
                  <>
                    {!isLoading && <View className=''>
                      <PostContent user={userData} post={item} navigation={navigation} removePost={handleRemovePost} editable={true}/>
                    </View>}
                  </>
                );
              }}
              onEndReached={handlePostEndReached}
              keyExtractor={item => item?.id.toString()}
              onEndReachedThreshold={1}
              ItemSeparatorComponent={() => {
                return (
                  <View className='mt-1'>

                  </View>
                );
              }}
            />
          </View>

    </SafeAreaView>
  );
}
