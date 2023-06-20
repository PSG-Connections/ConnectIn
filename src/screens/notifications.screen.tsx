import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import NotificationComponent from '../components/notification.component';
import { AuthContext } from '../contexts/auth.context';
import { GetUserNotifications } from '../apis/post.api';
import { UserNotifications } from '../models/user.model';

export default function Notifications (): JSX.Element {
  const authContext = useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [notifications, setnotifications] = useState<UserNotifications[]>([]);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);

  const handleNotificationEndReached = () => {
    setOffset((prevState) => (prevState + limit));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // setIsLoading(true);
    setTimeout(() => {
      setOffset(0);
      // setIsLoading(false);
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // fetch user posts
    void (async () => {
      await getNotifications();
    })();
  }, [offset]);

  const getNotifications = async () => {
    const accessToken = authContext.state.userToken;
    const requestData = {
      accessToken,
      limit,
      offset
    };
    const resp = await GetUserNotifications(requestData);
    console.log('get notification api response--->', resp);
    if (resp?.error) {
      // handle errors
    }
    if (offset === 0) {
      setnotifications(resp?.Notifications);
    } else {
      setnotifications((prevState) => {
        return [...prevState, ...resp?.Notifications];
      });
    }
  };

  return (
    <SafeAreaView className='h-full w-full bg-[#03001C]'>
      {/* headers */}
            <View className='flex justify-center h-[8%] '>
                <View className='flex flex-row fixed items-center ml-3'>
                    <View className='flex'>
                        <Text className='text-[23px] text-slate-100'>Notifications</Text>
                    </View>
                </View>
            </View>
      <View className='flex h-[92%] px-1'>
        <FlatList
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={notifications}
          renderItem={({ item, index }) => {
            return (
              <>
                <View className='flex h-[60px]'>
                  <NotificationComponent data={item}/>
                </View>
              </>
            );
          }}
          onEndReached={handleNotificationEndReached}
          keyExtractor={(item, index) => item.ID.toString()}
          onEndReachedThreshold={0.5}
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
