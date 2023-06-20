import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
// import { UserContext } from '../contexts/user.context';
import { AuthContext } from '../contexts/auth.context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetAllRecentsChats } from '../apis/chat.api';
import { ChatContext } from '../contexts/chat.context';
import ChatListTab from '../components/chatListTab.component';

type NavProps = NativeStackScreenProps<any>;
export default function ChatsListScreen ({ navigation, route }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  // const userContext = useContext(UserContext);
  const chatContext = useContext(ChatContext);
  const [limit] = useState(15);
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // setIsLoading(true);
    setTimeout(() => {
      chatContext.dispatch({ type: 'CLEAR_CHATLIST', payload: null });
      setOffset(0);
      // setIsLoading(false);
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleChatEndReached = () => {
    setOffset((prevState) => (prevState + limit));
  };

  useEffect(() => {
    // fetch user posts
    console.log('in fetch recents useeffect');
    void (async () => {
      await fetchRecentChats();
    })();
  }, [offset]);
  const fetchRecentChats = async () => {
    const accessToken = authContext.state.userToken;
    const requestData = {
      accessToken,
      limit,
      offset
    };
    const resp = await GetAllRecentsChats(requestData);
    console.log('chatlist----------', resp);

    if (resp?.error) {
      // handle errors
    } else {
      chatContext.dispatch({ type: 'ADD_CHATLIST', payload: { chatLists: resp?.chat } });
    }
  };

  const handleOnClickChat = (data: any) => {
    // look for unread message and put it to read message
    console.log('unread messages ------------------------->>>>>>', chatContext.state.unReadMessageList[data?.user_id]);
    if (chatContext.state.unReadMessageList[data?.user_id]) {
      chatContext.dispatch({ type: 'ADD_NEW_READ_MESSAGES', payload: { userId: data?.user_id, messages: chatContext.state.unReadMessageList[data?.user_id] } });
      // clear unread message after updating read state
      chatContext.dispatch({ type: 'CLEAR_UNREAD_MESSAGE', payload: { userId: data?.user_id } });
    }

    const chatScreenData = {
      userId: data?.user_id,
      email: data?.email,
      name: data?.first_name.concat(' ').concat(data?.last_name)
    };
    navigation.navigate('ChatScreen', chatScreenData);
  };

  return (
    <SafeAreaView className='h-full w-full bg-[#03001C]'>
      {/* headers */}
      <View className='flex justify-center h-[8%] fixed top-0'>
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
            <Text className='text-[23px]'>Chats</Text>
          </View>
        </View>
      </View>

      {/* chats */}
      { chatContext.state.chatLists && chatContext.state.chatLists.length > 0 &&
      <View className='flex h-[92%]'>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className=''
          // data={chatContext?.chats}
          data={chatContext.state.chatLists}
          renderItem={({ item }) => {
            return (
              <>
                <View className='flex h-[60px]'>
                  <TouchableOpacity className='flex' onPress={() => {
                    handleOnClickChat(item);
                  }}>
                      <ChatListTab data={item}/>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
          // onEndReached={handleChatEndReached}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={1}
          ItemSeparatorComponent={() => {
            return (
              <View className='mt-1'>

              </View>
            );
          }}
        />
      </View>}

    </SafeAreaView>

  );
}
