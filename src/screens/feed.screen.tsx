/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
// /* eslint-disable prettier/prettier */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, FlatList, RefreshControl } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../contexts/user.context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { clearEncryptedItemByKey, getEncryptedItemByKey } from '../helpers/utils';
import { AuthContext } from '../contexts/auth.context';
import { Post } from '../models/post.model';
import PostContent from '../components/postContent.component';
import { GetUserFeed } from '../apis/feed.api';
import { DeleteFCMToken } from '../apis/auth.api';

type NavProps = NativeStackScreenProps<any>;
export default function Feed ({ navigation, route }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const userImageUri = userContext.userData?.profile_image_url;
  const [modalVisible, setModalVisible] = useState(false);
  const deviceHeight = Dimensions.get('window').height;
  const [refreshing, setRefreshing] = React.useState(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const handleOnPressLogOut = async () => {
    try {
      console.log('logout clearing session');
      // need to clear usercontext, authcontext
      // clear fcm token in server
      const fcmData = await getEncryptedItemByKey('user_fcm_token');
      if (fcmData !== null) {
        const reqData = {
          ID: fcmData?.token.ID
        };
        const accessToken = authContext.state.userToken;
        const deleteFcmResp = await DeleteFCMToken({ data: reqData, accessToken });
        if (deleteFcmResp?.error) {
          // handle errors
        }
      }
      await clearEncryptedItemByKey('user_fcm_token');

      authContext.dispatch({ type: 'SIGNED_OUT' });
      userContext.ClearUserInContext();
      await clearEncryptedItemByKey('user_session');
    } catch (error) {
      console.log(error);
    }
    // authContext.dispatch({ type: 'SIGNED_OUT' });
  };

  const handlePostEndReached = () => {
    setOffset((prevState) => (prevState + limit));
  };

  useEffect(() => {
    // fetch user posts
    void (async () => {
      await getUserFeed();
    })();
  }, [offset]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // setIsLoading(true);
    setTimeout(() => {
      setOffset(0);
      // setIsLoading(false);
      setRefreshing(false);
    }, 2000);
  }, []);

  const getUserFeed = async () => {
    const accessToken = authContext.state.userToken;
    const requestData = {
      accessToken,
      limit,
      offset
    };
    console.log('calling get posts api--->', requestData);
    const resp = await GetUserFeed(requestData);
    console.log('get post api response--->', resp);
    if (resp?.error) {
      // handle errors
    }
    if (offset === 0) {
      setPosts(resp?.Posts);
    } else {
      setPosts((prevState) => {
        return [...prevState, ...resp?.Posts];
      });
    }
  };

  return (
    <SafeAreaView className='h-screen'>
      <View className='h-[7%] bg-slate-600 fixed flex flex-row justify-between'>
        <TouchableOpacity className='flex justify-center ml-[4%]' onPress={() => { setModalVisible(true); }}>
        <Image
              className="h-[40px] w-[40px] rounded-full"
              source={(userImageUri) ? { uri: userImageUri } : require('../assets/profile.png')}
            />
        </TouchableOpacity>
        <View className='flex justify-center mr-[4%]'>
          <Text className='text-white text-xl'>Connect-In</Text>
        </View>
        <View className='flex flex-row justify-center mr-[4%] items-center'>
          <TouchableOpacity>
            <MaterialCommunityIcons name='message-flash' color='white' size={23}></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      </View>

      {/* Timeline */}
      <View className='h-[90%] flex'>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className='flex bg-slate-400 pt-1'
          data={posts}
          renderItem={({ item }) => {
            return (
              <>
                {<View className='mx-1'>
                  <PostContent user={userContext.userData} post={item} navigation={navigation} removePost={null} editable={false}/>
                </View>}
              </>
            );
          }}
          onEndReached={handlePostEndReached}
          keyExtractor={item => item?.id.toString()}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => {
            return (
              <View className='mt-1'>

              </View>
            );
          }}
          />
      </View>
      <Modal
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        deviceHeight={deviceHeight}
        // hasBackdrop={true}
        isVisible={modalVisible}
        onBackdropPress={() => { setModalVisible(false); }}
        onSwipeComplete={() => { setModalVisible(false); }}
        swipeDirection="left"
        backdropTransitionOutTiming={0}
        className='m-0'
      >
        <View className='h-full flex flex-row'>
          <View className='w-[65%] bg-white flex h-screen'>
            <View className='flex h-screen'>
              <View>
                <View className='h-[130px] bg-slate-600 flex'>

                </View>
                <View className='flex justify-center items-center realtive -translate-y-[60px]'>
                  <Image
                    className="h-[120px] w-[120px] rounded-full flex"
                    source={(userImageUri) ? { uri: userImageUri } : require('../assets/profile.png')}
                  />
                </View>
                <View className='flex items-center -translate-y-10'>
                  <Text className='text-black text-[19px]'>{userContext.userData.first_name} {userContext.userData.last_name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('Profile');
                    }}
                    className='mt-1'
                  >
                    <Text className='text-slate-500'>View Profile</Text>
                  </TouchableOpacity>
                </View>

                {/* line */}
                <View className='border-solid border-t-2 border-slate-300  -translate-y-5'></View>

                {/* settings button */}
                <View className='flex items-center mb-4'>
                    <TouchableOpacity className='flex flex-row items-center w-[50%] '>
                    <Ionicons name='settings' color='#0F172A' size={25}></Ionicons>
                      <Text className='text-slate-700 text-lg ml-3'>Settings</Text>
                    </TouchableOpacity>
                </View>

                {/* line */}
                <View className='border-solid border-t-2 border-slate-300'></View>

              </View>
              <View className="flex h-[40px] absolute bottom-2 w-[95%] mx-2">
                <TouchableOpacity
                  onPress={() => {
                    void (async () => {
                      await handleOnPressLogOut();
                    })();
                  }}
                  className='flex items-center justify-center w-full'>
                    <View className="bg-red-500 flex items-center h-[40px] w-full justify-center rounded-full">
                      <Text className="font-bold text-white flex">Log Out</Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity className='w-[35%] flex' onPress={() => { setModalVisible(false); }} activeOpacity={1}>
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView>
        <View className="h-screen bg-slate-600 items-center justify-center pb-10">
          <Text className="text-white">Feed here ...............</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
