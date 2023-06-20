/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useContext, useState } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity,
  Image, ScrollView, TextInput, Platform, Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../contexts/user.context';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../contexts/auth.context';
import Carousel from 'react-native-snap-carousel';
import { MediaUpload } from '../models/post.model';
import Video from 'react-native-video';
import { AddPost, GetPostUploadUrl } from '../apis/post.api';
import { UploadBlobToCloud } from '../apis';

export default function PostScreen ({ navigation }: any): JSX.Element {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [enablePostButton, setEnablePostButton] = useState(false);
  const [postTextContent, setPostTextContent] = useState('');
  const [postMedia, setPostMedia] = useState<MediaUpload[]>([]);
  const [mediaUploadWarning, setMediaUploadWarning] = useState<boolean>(false);
  const [postMediaIndexSelected, setPostMediaIndexSelected] = useState(0);
  const [displayMedia, setDisplayMedia] = useState<boolean>(false);
  const [mediaCount, setMediaCount] = useState<number>(0);
  const [postViewType] = useState('Anyone');
  const [postCommentsType, setPostCommentsType] = useState(true);
  const { width } = Dimensions.get('window');

  const handleOnPost = async () => {
    // handle post
    const accessToken = authContext.state.userToken;
    console.log('media count', mediaCount);
    // fetch media upload urls
    const resp = await GetPostUploadUrl({ size: mediaCount, accessToken });
    if (resp?.error) {
      // handle errors
    } else {
      // upload to presigned url

      const presignedUrls: string[] = resp?.url as [];
      postMedia.forEach((item, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const Fileuri: string | undefined = Platform.OS === 'android' ? item?.media.uri : 'file://' + item?.media.uri;
        const contentType = item.media.type;
        console.log(' cctype', contentType);

        void (async () => {
          await UploadBlobToCloud({ presignedUrl: presignedUrls[index], Fileuri, contentType });
        })();
      });

      // upload caption to post service

      const captionResp = await AddPost({ caption: postTextContent, accessToken });
      if (captionResp?.error) {
        // handle errors
      } else {
        console.log('add post response -->', captionResp);
        await clearState();
        navigation.goBack();
      }
    }
  };

  const clearState = async () => {
    setEnablePostButton(false);
    setPostTextContent('');
    setPostMedia([]);
    setMediaUploadWarning(false);
    setDisplayMedia(false);
    setMediaCount(0);
  };

  const handleDeleteMedia = async (deleteIndex: any) => {
    console.log('index--->', postMediaIndexSelected);
    const newMedia = postMedia.filter((_item, itemIndex) => itemIndex !== deleteIndex);
    setPostMedia(newMedia);
    setMediaCount((prevState) => {
      return (prevState - 1);
    });
    setMediaUploadWarning(false);
    // console.log('media count', mediaCount);

    if (mediaCount === 1) {
      setDisplayMedia(false);
      // console.log('post content', postTextContent);

      if (postTextContent === '') {
        setEnablePostButton(false);
      }
    }
    // console.log('len of post media', postMedia.length);
  };

  const handleClickPhoto = async () => {
    await launchCamera({ mediaType: 'photo' }, async (response: ImagePickerResponse) => {
      console.log(response);
      if (response.assets) {
        setDisplayMedia(true);
        setEnablePostButton(true);
        const photo = response.assets;
        const addPhoto: MediaUpload = {
          type: 'photo',
          media: photo[0]
        };
        setPostMedia((prevState) => {
          return [...prevState, addPhoto];
        });
        // console.log('post media lenght', postMedia.length);

        setMediaCount((prevState) => {
          return (prevState + 1);
        });
        if (postMedia.length >= 4) {
          setMediaUploadWarning(true);
        }
        // console.log('media count-->', mediaCount);
      }
    });
  };

  const handleUploadVideo = async () => {
    await launchImageLibrary({ mediaType: 'video' }, async (response: ImagePickerResponse) => {
      console.log(response);
      if (response.assets) {
        setDisplayMedia(true);
        setEnablePostButton(true);
        const video = response.assets;
        const addVideo: MediaUpload = {
          type: 'video',
          media: video[0]
        };
        setPostMedia((prevState) => {
          return [...prevState, addVideo];
        });
        // console.log('post media lenght', postMedia.length);

        setMediaCount((prevState) => {
          return (prevState + 1);
        });
        if (postMedia.length >= 4) {
          setMediaUploadWarning(true);
        }
        // console.log('media count-->', mediaCount);
      }
    });
  };

  const handleChoosePhoto = async () => {
    await launchImageLibrary({ mediaType: 'photo' }, async (response: ImagePickerResponse) => {
      console.log(response);
      if (response.assets) {
        setDisplayMedia(true);
        setEnablePostButton(true);
        const photo = response.assets;
        const addPhoto: MediaUpload = {
          type: 'photo',
          media: photo[0]
        };
        setPostMedia((prevState) => {
          return [...prevState, addPhoto];
        });
        // console.log('post media lenght', postMedia.length);

        setMediaCount((prevState) => {
          return (prevState + 1);
        });
        if (postMedia.length >= 4) {
          setMediaUploadWarning(true);
        }
        // console.log('media count-->', mediaCount);
      }
    });
  };
  return (
    <SafeAreaView className='bg-[#03001C] h-full w-full'>
      <View className='mx-4 mt-3 h-full'>
        {/* Fixed Header */}
        <View className='flex flex-row justify-between h-[40px] fixed items-center'>
            <View className='flex'>
                {/* CLose Button */}
                <Ionicons name='close' color='white' size={35} onPress={() => {
                  void (async () => {
                    await clearState();
                  })();
                  navigation.goBack();
                }}></Ionicons>
            </View>
            <View className={`mr-[10px] ${enablePostButton ? 'bg-blue-500' : 'bg-[#323131]'} rounded-full w-[60px] h-[35px] flex justify-center items-center`}>
              <TouchableOpacity
              className='flex justify-center'
              disabled={!enablePostButton}
               onPress={() => {
                 void (async () => {
                   await handleOnPost();
                 })();
               }}>
                <Text className='text-white'>Post</Text>
              </TouchableOpacity>
            </View>
        </View>

        <ScrollView className='mt-6'>
          {/* profile image with name */}
          <View className='flex flex-row'>
              <View className='flex'>
                <Image
                      className="h-[60px] w-[60px] rounded-full flex"
                      source={(userContext.userData?.profile_image_url) ? { uri: userContext.userData?.profile_image_url } : require('../assets/profile.png')}
                    />
              </View>
              <View className='flex flex-col ml-5 justify-around'>
                <Text className='text-white'>{userContext.userData?.first_name} {userContext.userData?.last_name}</Text>
                <View className='border-solid border-slate-300 border-2 rounded-xl px-2 flex flex-row'>
                  <Text className='mr-2 text-white'>{postViewType}</Text>
                  <Ionicons name='ios-caret-down' color='white' size={20}></Ionicons>
                </View>
              </View>
          </View>
          {/* post content */}
          <View>
            <TextInput className='text-white'
              multiline={true}
              value={postTextContent}
              onChangeText={(value) => {
                // console.log('value entered', value);
                setPostTextContent(value);
                if (value.length >= 1) {
                  setEnablePostButton(true);
                } else {
                  if (mediaCount === 0) {
                    setEnablePostButton(false);
                  }
                }
              }}
              placeholder='What do you want to talk about?'
              placeholderTextColor={'#ffffff'}
              underlineColorAndroid='transparent'
            />
          </View>
          {/* display media as carousel */}
          {displayMedia &&
          <View className='flex h-[200px] w-[98%]'>
            {/* <Image className='h-full w-full' source={{ uri: postBody.url[0] }}/> */}
            <Carousel
              data={postMedia}
              layout='default'
              itemWidth={width - 23}
              sliderWidth={width - 23}
              firstItem={0}
              onSnapToItem={(index) => { setPostMediaIndexSelected(index); }}

              renderItem={({ item, index }) => {
                return (
                  <>
                      {
                      //  const Imageuri: string | undefined = Platform.OS === 'android' ? photo?.uri : 'file://' + photo?.uri;
                      <View>
                       {item.type === 'photo'
                         ? <Image key={index} resizeMode='cover' className='h-full w-full' source={{ uri: item?.media.uri }}/>
                         : <Video
                          className='h-full w-full'
                          resizeMode='contain'
                          source={{ uri: item?.media.uri }}
                          controls={true}
                          paused={true}
                          preventsDisplaySleepDuringVideoPlayback={true}
                            /> }
                        <View className='absolute bg-black rounded-3xl w-[9%] h-[13%] flex items-center left-4 top-4 justify-center'>
                          <TouchableOpacity className='flex' onPress={() => {
                            void (async () => {
                              await handleDeleteMedia(index);
                            })();
                          }}>
                              <View className='flex'>
                                <Ionicons name='close' color='white' size={25}></Ionicons>
                              </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                      }
                  </>
                );
              }}
            />
            {mediaCount > 1 && <View className='absolute bg-black rounded-3xl w-[9%] h-[12%] flex items-center right-4 top-4 justify-center'>
                <Text className='text-white'>{postMediaIndexSelected + 1}/{mediaCount}</Text>
            </View>}
          </View>}
        </ScrollView>

        {/* fixed bottom */}
        <View className='flex flex-row h-[60px] w-full fixed bottom-0 mt-2'>
            <View className='flex flex-row justify-between w-[40%] pl-2'>
              <TouchableOpacity className='flex'
                disabled={mediaUploadWarning}
                onPress={() => {
                  void (async () => {
                    await handleClickPhoto();
                  })();
                }}
              >
                <Ionicons name='camera' color='white' size={25}></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity className='flex'
                disabled={mediaUploadWarning}
                onPress={() => {
                  void (async () => {
                    await handleUploadVideo();
                  })();
                }}
              >
                <Ionicons name='videocam' color='white' size={25}></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity className='flex'
              disabled={mediaUploadWarning}
                onPress={() => {
                  void (async () => {
                    await handleChoosePhoto();
                  })();
                }}
              >
                <Ionicons name='image-outline' color={`${mediaUploadWarning ? '#64748B' : 'white'}`} size={25}></Ionicons>
              </TouchableOpacity>
            </View>
            <View className='flex w-[30%]'></View>
            <View className='flex w-[30%] pr-3 mt-1'>
              <TouchableOpacity className='flex flex-row justify-end items-center' disabled={true} onPress={() => {
                setPostCommentsType(!postCommentsType);
              }}>
                <MaterialCommunityIcons name={`${postCommentsType ? 'comment-outline' : 'comment-off-outline'}`} color='white' size={17}></MaterialCommunityIcons>
                <Text className='ml-1 text-[15px] text-white'>
                  {postCommentsType ? 'Comments' : 'No one'}
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </SafeAreaView>

  );
}
