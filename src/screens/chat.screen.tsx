import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, RefreshControl, FlatList, TextInput } from 'react-native';
// import { UserContext } from '../contexts/user.context';
import { AuthContext } from '../contexts/auth.context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetChatHistoryByUser } from '../apis/chat.api';
import { ChatContext } from '../contexts/chat.context';
import { WSDTO } from '../models/chat.model';
import { UserContext } from '../contexts/user.context';
import ChatMessageTab from '../components/chatMessageTab.component';

type NavProps = NativeStackScreenProps<any>;
export default function ChatScreen ({ navigation, route }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);
  const routeData = route.params;
  const [limit] = useState(15);
  const [offset, setOffset] = useState<number | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [newMessage, setNewMessage] = useState<string>('');
  console.log('route data -->', routeData);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // setIsLoading(true);
    setTimeout(() => {
      setOffset(0);
      // setIsLoading(false);
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleChatEndReached = () => {
    setOffset((prevState) => (prevState as number + limit));
  };

  useEffect(() => {
    // fetch user posts
    if (offset !== null) {
      void (async () => {
        // await fetchChatHistory();
      })();
    }
  }, [offset]);

  useEffect(() => {
    // set chatscreen state
    chatContext.dispatch({ type: 'SET_CURRENT_CHAT_SCREEN', payload: { currentUserChatScreen: routeData?.userId } });
    // set offset based on number of unread messages
    if (chatContext.state.readMessageList[routeData?.userId] && chatContext.state.readMessageList[routeData?.userId].length > 0) {
      setOffset(chatContext.state.readMessageList[routeData?.userId].length);
    }
    return () => {
      chatContext.dispatch({ type: 'SET_CURRENT_CHAT_SCREEN', payload: { currentUserChatScreen: null } });
    };
  }, []);

  const fetchChatHistory = async () => {
    const accessToken = authContext.state.userToken;
    const requestData = {
      accessToken,
      limit,
      offset
    };
    const resp = await GetChatHistoryByUser(requestData);
    if (resp?.error) {
      // handle errors
    }
  };

  const handleSendMessage = () => {
    // send message to server via ws
    const reqData: WSDTO = {
      sender: userContext.userData.email,
      sender_id: userContext.userData.ID,
      message: newMessage,
      receiver: routeData?.email,
      receiver_id: routeData?.userId
    };
    console.log('sending message -->', reqData);

    chatContext.sendMessages(reqData);

    chatContext.dispatch({ type: 'ADD_NEW_READ_MESSAGES', payload: { userId: routeData?.userId, messages: [reqData] } });
    setNewMessage(''); // clear the input
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
            <Text className='text-[23px]'>{routeData?.name}</Text>
          </View>
        </View>
      </View>

      {/* chats */}
      <View className='flex h-[80%]'>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className=''
          inverted={true}
          // data={chatContext?.chats}
          data={chatContext.state.readMessageList[routeData?.userId]}
          renderItem={({ item }) => {
            return (
              <>
                <View className={`flex h-[20px] w-[50px] rounded-full border-[2px] border-yellow-50 ${item.sender_id === userContext.userData.ID ? 'right-0' : 'left-0'}`}>
                    <ChatMessageTab data={item}/>
                </View>
              </>
            );
          }}
          onEndReached={handleChatEndReached}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => {
            return (
              <View className='mt-1'>

              </View>
            );
          }}
        />
        </View>

        {/* chat input */}
        <View className='flex h-[10%] fixed bottom-0 justify-end'>
            <View className='flex flex-row mx-[10px] h-[50px]'>
                <View className='pl-2 w-[88%] bg-black border-[2px] border-slate-200 rounded-full justify-center'>
                    <TextInput
                        className='flex'
                        placeholder='Add a message...'
                        value={newMessage}
                        onChangeText={(value) => {
                          setNewMessage(value);
                        }}
                    />
                </View>
                <View className='flex justify-center mx-auto pl-1'>
                    <Ionicons name='ios-send-sharp' color={`${newMessage === '' ? 'grey' : 'white'}`} size={30}
                    onPress={() => {
                      handleSendMessage();
                    }}></Ionicons>
                </View>
            </View>
        </View>
    </SafeAreaView>

  );
}
