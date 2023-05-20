/* eslint-disable react-native/no-inline-styles */
import {
  RefreshControl,
  SafeAreaView, ScrollView, View, Text, Linking, TouchableOpacity, Alert, FlatList
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
import { FollowUser, UnFollowUser } from '../apis/connections.api';
import { Post } from '../models/post.model';
import PostContent from './postContent.component';
import { GetUserPostsByEmail } from '../apis/post.api';
// import { axiosPut } from '../apis';

type NavProps = NativeStackScreenProps<any>;
export default function UserProfile ({ navigation, route }: NavProps): JSX.Element {
  const routeData = route.params;
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userData, setUserData] = useState<User>();
  const [following, setFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

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
    // fetch user posts
    void (async () => {
      await getUserPosts();
    })();
  }, [offset]);

  useEffect(() => {
    setLoading(true);
    console.log('emial -->', routeData?.email);
    void (async () => {
      const resp = await getUserByEmail(routeData?.email);
      console.log(resp);

      // handle errors
      setUserData(resp?.user);
      setLoading(false);
      setFollowing(resp?.following || false);
    })();
    console.log('user---->>', userData);
  }, []);

  const getUserPosts = async () => {
    const accessToken = authContext.state.userToken;
    const requestData = {
      accessToken,
      email: routeData?.email,
      limit,
      offset
    };
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

  const handlePostEndReached = () => {
    setOffset((prevState) => (prevState + limit));
  };

  const getUserByEmail = async (email: string) => {
    console.log('in function --> getotheruserprofile');
    const accessToken = authContext.state.userToken;
    const resp = await GetSearchUserByEmail({ accessToken, email });
    // handle errors
    return resp;
  };
  const handleFollowButtonClick = async () => {
    const accessToken = authContext.state.userToken;
    if (following) {
      Alert.alert('Confirmation', 'Are you sure to unfollow ?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            void (async () => {
              const resp = await UnFollowUser({ accessToken, email: userData?.email });
              // handle errors
              if (!resp?.errors) {
                setFollowing(false);
              }
            })();
          }
        }
      ]);
    } else {
      const resp = await FollowUser({ accessToken, email: userData?.email });
      // handle errors
      if (!resp?.errors) {
        setFollowing(true);
      }
    }
  };
  return (
    <>
      <SafeAreaView className=" h-screen w-screen pb-12">
          <View className=''>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              className=''
              data={posts}
              ListHeaderComponent={() => {
                return (
                 <>
                  {!loading && <ScrollView className="flex flex-col" refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    {/* Cover & Profile Picture */}
                    <ProfileHeader data={userData} handleChoosePhoto={null} loggedInUser={false}/>

                    {/* Line */}
                    <View className="bg-[#dbd9d9] h-[10px] w-full"></View>

                    {/* follow */}
                    <View className='flex flex-row w-full my-3 pr-2'>
                      <View className='flex w-[45%] items-center h-[33px]'>
                        <TouchableOpacity className={`flex w-[95%] ${following ? 'bg-slate-400' : 'bg-blue-600'} flex-row justify-center h-full items-center rounded-3xl`}
                        onPress={() => {
                          void (async () => {
                            await handleFollowButtonClick();
                          })();
                        }}
                        >
                          {following
                            ? <MaterialCommunityIcons name='handshake' color='white' size={18}></MaterialCommunityIcons>
                            : <MaterialCommunityIcons name='plus' color='white' size={18}></MaterialCommunityIcons>}
                          <Text className={`ml-1 text-md ${following ? 'text-slate-100' : 'text-white'}`}>{following ? 'Following' : 'Follow'}</Text>
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
                      userData?.UserExperience.map((item: any) => (
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
                      userData?.UserEducation.map((item: any) => (
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

                    {/* Posts */}
                    <View className="pt-5 pl-2 mb-4 pr-2">
                      <View className="flex flex-row ">
                        <Text className="text-black font-black text-[20px] w-[70%] ">
                          Posts
                        </Text>
                      </View>
                    </View>

                  </ScrollView> }
                 </>
                );
              }}
              renderItem={({ item }) => {
                return (
                  <>
                    {!loading && <View className='mx-1'>
                      <PostContent user={userData} post={item} navigation={navigation} removePost={null}/>
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
      </>
  );
}
