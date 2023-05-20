import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../contexts/user.context';
import { Comment } from '../models/post.model';
import { AuthContext } from '../contexts/auth.context';
import { AddCommentByPostId, GetCommentsPostId } from '../apis/post.api';
import CommentTab from '../components/commentTab.component';

type NavProps = NativeStackScreenProps<any>;
export default function CommentsScreen ({ navigation, route }: NavProps): JSX.Element {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState<string>('');
  const routeData = route.params;
  const [limit] = useState(15);
  const [offset, setOffset] = useState(0);

  const handlePostEndReached = () => {
    setOffset((prevState) => (prevState + limit));
  };

  useEffect(() => {
    // fetch user posts
    void (async () => {
      await getComments();
    })();
  }, [offset]);

  const getComments = async () => {
    const accessToken = authContext.state.userToken;
    const requestData = {
      accessToken,
      postId: routeData?.postId,
      limit,
      offset
    };
    const resp = await GetCommentsPostId(requestData);
    console.log('get comments api response--->', resp);
    if (resp?.error) {
      // handle errors
    }
    setComments((prevState) => {
      return [...prevState, ...resp?.comments];
    });
  };

  const handleAddComment = async () => {
    const accessToken = authContext.state.userToken;
    const requestData = {
      accessToken,
      postId: routeData?.postId,
      comment: commentContent
    };
    const resp = await AddCommentByPostId(requestData);
    console.log('add comments api response--->', resp);
    if (resp?.error) {
      // handle errors
    } else {
      setCommentContent('');
      setComments((prevState) => {
        return [...prevState, resp?.comments];
      });
    }
  };

  return (
        <SafeAreaView className='h-full w-full'>

            {/* headers */}
            <View className='flex justify-center bg-slate-500 h-[8%] '>
                <View className='flex flex-row h-[40px] fixed items-center'>
                    <View className='flex w-[15%] items-center'>
                        {/* CLose Button */}
                        <View className='flex'>
                            <Ionicons name='arrow-back' color='white' size={30} onPress={() => {
                              navigation.goBack();
                            }}></Ionicons>
                        </View>
                    </View>
                    <View className='flex ml-3 w-[85%]'>
                        <Text className='text-[23px]'>Comments</Text>
                    </View>
                </View>
            </View>

            {/* body */}
            <View className='flex h-[84%] bg-slate-500 pt-3'>
                <FlatList
                 data={comments}
                 renderItem={({ item, index }) => {
                   return (
                      <>
                        <View className='flex'>
                            <CommentTab data={item}/>
                        </View>
                      </>
                   );
                 }}
                 onEndReached={handlePostEndReached}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={1}
                ItemSeparatorComponent={() => {
                  return (
                    <View className='mt-3'></View>
                  );
                }}
                />
            </View>

            {/* footer */}
            <View className='flex flex-row fixed bottom-0 bg-slate-500 items-center px-2 h-[8%] mb-[2px]'>
                <View className='flex w-[15%] items-center'>
                    <Image
                        className="h-[40px] w-[40px] rounded-full flex"
                        source={(userContext.userData?.profile_image_url) ? { uri: userContext.userData?.profile_image_url } : require('../assets/profile.png')}
                        />
                </View>
                <View className='flex mx-1 w-[76%]'>
                    <TextInput
                    placeholder='Add a comment...'
                    value={commentContent}
                    onChangeText={(value) => {
                      setCommentContent(value);
                    }}
                    />
                </View>
                <View className='flex w-[10%]'>
                  <TouchableOpacity className='' disabled={commentContent === ''} onPress={() => {
                    void (async () => {
                      await handleAddComment();
                    })();
                  }}>
                    <FontAwesome name='paper-plane' color={`${commentContent === '' ? '#64748B' : 'white'}`} size={20}></FontAwesome>
                  </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
  );
}
