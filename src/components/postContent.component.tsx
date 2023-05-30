/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Post } from '../models/post.model';
import { ConvertDateToPostContentDate } from '../helpers/dateTime';
import { DeletePostByPostId, GetPostLikesByPostId, LikePostByPostId, RemoveLikePostByPostId } from '../apis/post.api';
import { AuthContext } from '../contexts/auth.context';
import Carousel from 'react-native-snap-carousel';
import { UserSearchResult } from '../models/user.model';
import Modal from 'react-native-modal';
import Video from 'react-native-video';

export default function PostContent (props: any): JSX.Element {
  const authContext = useContext(AuthContext);
  const postBody: Post = props?.post;
  const [liked, setLiked] = useState<boolean>();
  const [postTime, setPostTime] = useState<string>('');
  const [imageIndexSelected, setImageIndexSelected] = useState(0);
  const { width } = Dimensions.get('window');
  const [likes, setLikes] = useState<UserSearchResult[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const HandleLikeButton = async () => {
    const accessToken = authContext.state.userToken;
    if (liked) {
      const resp = await RemoveLikePostByPostId({ accessToken, postId: postBody.id });
      console.log('remove like resp', resp);

      if (resp?.error) {
        // handle errors
      } else {
        setLiked(false);
      }
    } else {
      const resp = await LikePostByPostId({ accessToken, postId: postBody.id });
      console.log('like resp', resp);

      if (resp?.error) {
      // handle errors
      } else {
        setLiked(true);
      }
    }
  };

  const handleDeletePost = async () => {
    const accessToken = authContext.state.userToken;
    const resp = await DeletePostByPostId({ accessToken, postId: postBody.id });
    console.log('delete post resp', resp);
    if (resp?.error) {
      // handle errors
    } else {
      // handle success
      setModalVisible(false);
      props?.removePost(postBody.id);
    }
  };

  useEffect(() => {
    setLiked(postBody.liked);
    setPostTime(ConvertDateToPostContentDate(postBody.create_at));
  }, []);

  useEffect(() => {
    void (async () => {
      const accessToken = authContext.state.userToken;
      const resp = await GetPostLikesByPostId({ accessToken, limit: 3, offset: 0, postId: postBody.id });
      console.log('get all likes resp', resp);
      if (resp?.error) {
        // handle errors
      }
      setLikes(resp?.users);
    })();
  }, [liked]);

  return (
       <SafeAreaView className='flex flex-col bg-slate-700 rounded-[4px]'>
            {/* headers */}
            <View className='flex h-[70px] bg-blue-300 justify-center pl-2 rounded-t-[4px]'>
                <View className='flex flex-row h-[80%]'>
                    <View className='flex w-[13%] h-[90%]'>
                        <Image className='h-full w-full rounded-full' source={props?.user?.profile_image_url ? { uri: props?.user?.profile_image_url } : require('../assets/profile.png')}/>
                    </View>
                    <View className='flex flex-col ml-2 w-[70%]'>
                        <Text className='text-[16px]'>{props?.user?.first_name} {props?.user?.last_name}</Text>
                        {props?.user?.headline && <Text className='text-[13px]'>{props?.user?.headline}</Text>}
                        <View className='flex flex-row'>
                            <Text className='text-[10px]'>{postTime}</Text>
                            <View className='flex flex-row mt-[2px]'>
                                <Entypo name='dot-single' color='white' size={10}></Entypo>
                                <FontAwesome name='globe' color='white' size={10}></FontAwesome>
                            </View>
                        </View>
                    </View>
                    <View className='flex w-[17%] items-center justify-center'>
                        <TouchableOpacity className='flex' onPress={() => {
                          setModalVisible(true);
                        }}>
                          <Entypo name='dots-three-vertical' color='white' size={25}></Entypo>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* content */}
            <View className='flex flex-col mt-3 ml-2'>
                {/* Captions */}
                <View className='flex mb-2'>
                    {/* add elipsis */}
                    <Text>{postBody.caption}</Text>
                </View>
                {/* images */}
                <View className='flex h-[200px] w-[98%]'>
                    {/* <Image className='h-full w-full' source={{ uri: postBody.url[0] }}/> */}
                    <Carousel
                      data={postBody?.MetaData}
                      layout='default'
                      itemWidth={width - 23}
                      sliderWidth={width - 23}
                      onSnapToItem={(index) => { setImageIndexSelected(index); }}
                      renderItem={({ item, index }) => {
                        return (
                          <>
                            { item.type.includes('video')
                              ? <Video
                              className='h-full w-full'
                              resizeMode='contain'
                              source={{ uri: item?.url }}
                              controls={true}
                              paused={true}
                              preventsDisplaySleepDuringVideoPlayback={true}
                            />
                              : item.type.includes('image')
                                ? <Image key={index} resizeMode='cover' className='h-full w-full' source={{ uri: item.url }}/>
                                : <></>
                            }
                          </>
                        );
                      }}
                    />
                    {postBody.count > 1 && <View className='absolute bg-black rounded-3xl w-[9%] h-[12%] flex items-center right-4 top-4 justify-center'>
                        <Text className='text-white'>{imageIndexSelected + 1}/{postBody.count}</Text>
                    </View>}
                </View>
                <View className='flex w-full pr-2'>
                    {likes &&
                    <View className='flex flex-row bg-white'>
                      <View className={`h-[25px] ${likes.length === 3 ? 'w-[15%]' : likes.length === 2 ? 'w-[11%]' : 'w-[8%]'} my-[1px] flex flex-row items-center`}>
                        {likes && likes.length > 0 && likes.map((item, index): any => (
                              <View key={index} className={`flex h-[23px] w-[23px] rounded-full absolute
                                ${index === 0 ? 'left-[2px]' : index === 1 ? 'left-[14px]' : 'left-[28px]'}
                                ${'z-.'.concat(index.toString())}`}>
                                {item.profile_image_url && item.profile_image_url !== '' && <Image className='h-full w-full rounded-full' resizeMode='contain' source={{ uri: item.profile_image_url }}/>}
                              </View>
                        ))}
                        </View>
                        <View className='flex flex-row items-center'>
                        {likes && likes.length > 0 && likes.map((item, index): any => (
                            <View key={index} className='flex mr-1'>
                              {index === likes.length - 1
                                ? <Text className='text-black text-[10px]'>{item.first_name} {item.last_name}</Text>
                                : <Text className='text-black text-[10px]'>{item.first_name} {item.last_name},</Text>}
                            </View>
                        ))}
                      </View>
                      {postBody.likes > 3 && <View className='flex flex-row items-center'>
                        <Text className='text-black text-[10px]'>and {(postBody.likes - 3).toString()} others</Text>
                      </View>}
                    </View>}
                    <View className='flex mt-2 border-solid border-t-[1px] border-white w-full'></View>
                </View>
            </View>

            {/* footer */}
            <View className='flex flex-row justify-around h-[25px] my-2'>
                <View className='flex flex-col items-center justify-center w-[20%]'>
                    <TouchableOpacity className='flex items-center' onPress={() => {
                      void (async () => {
                        await HandleLikeButton();
                      })();
                    }}>
                        <View className='flex'>
                            <Foundation name='like' color={`${liked ? '#60A5FA' : 'white'}`} size={18}></Foundation>
                        </View>
                        <Text className={`text-[12px] ${liked ? 'text-blue-400' : 'text-white'}`}>Like</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-col items-center justify-center w-[20%]'>
                    <TouchableOpacity className='flex items-center' onPress={() => {
                      props?.navigation.navigate('CommentsScreen', { postId: postBody.id });
                    }}>
                        <View className='flex'>
                            <MaterialIcons name='comment' color='white' size={16}></MaterialIcons>
                        </View>
                        <Text className='text-[12px]'>Comment</Text>
                    </TouchableOpacity>
                </View>
                <View className='flex flex-col items-center justify-center w-[20%]'>
                    <TouchableOpacity className='flex items-center' onPress={() => {
                      //
                    }}>
                        <View className='flex'>
                            <FontAwesome name='share' color='white' size={14}></FontAwesome>
                        </View>
                        <Text className='text-[12px] flex'>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            // hasBackdrop={true}
            isVisible={modalVisible}
            onBackdropPress={() => { setModalVisible(false); }}
            onSwipeComplete={() => { setModalVisible(false); }}
            swipeDirection='down'
            backdropTransitionOutTiming={0}
            className='m-0'
          >
            <View className='w-full flex flex-col'>
              <TouchableOpacity className='h-[70%] flex' onPress={() => { setModalVisible(false); }} activeOpacity={1}>
              </TouchableOpacity>
              <View className='h-[30%] bg-white flex rounded-t-[30px]'>
                <View className='flex flex-col items-center'>
                  <View className='w-[35%] mt-5 mb-4 border-solid border-t-4 border-slate-600 rounded-full'></View>
                </View>
                <View className='flex flex-col items-center'>
                  {props?.editable && <TouchableOpacity className='flex w-[80%] h-[30px] items-center justify-center border-solid border-2 border-red-500 rounded-full' onPress={() => {
                    void (async () => {
                      await handleDeletePost();
                    })();
                  }}>
                    <Text className='flex text-red-500'>Delete Post</Text>
                  </TouchableOpacity>}
                </View>
              </View>
            </View>
          </Modal>
       </SafeAreaView>
  );
}
