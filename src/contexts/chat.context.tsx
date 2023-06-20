import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { WSDTO, ChatState, ChatAction } from '../models/chat.model';
import { AuthContext } from './auth.context';
import { messageServerWebSocketUrl } from '../constants/common.constant';
import WebSocketService from '../utils/websocket';

export const ChatContext = createContext<any | null>(null);

export default function ChatContextProvider ({ children }: {children: any}): JSX.Element {
  const authContext = useContext(AuthContext);
  const webSocketService = useRef<WebSocketService>();

  const reducer = (prevState: ChatState, action: ChatAction): ChatState => {
    switch (action.type) {
      case 'ADD_CHATLIST':
        return {
          ...prevState,
          chatLists: [...prevState.chatLists, ...action.payload.chatLists]
        };
      case 'CLEAR_CHATLIST':
        return {
          ...prevState,
          chatLists: []
        };
      case 'ADD_UNREAD_MESSAGE':{
        const userId = action.payload.userId;
        return {
          ...prevState,
          unReadMessageList: {
            ...prevState.unReadMessageList,
            [userId]: [action.payload.message, ...(prevState.unReadMessageList[userId] || [])]
          }
        };
      }
      case 'CLEAR_UNREAD_MESSAGE':{
        const userId = action.payload.userId;
        return {
          ...prevState,
          unReadMessageList: {
            ...prevState.unReadMessageList,
            [userId]: []
          }
        };
      }
      case 'ADD_NEW_READ_MESSAGES':{
        const userId = action.payload.userId;
        return {
          ...prevState,
          readMessageList: {
            ...prevState.readMessageList,
            [userId]: [...action.payload.messages, ...(prevState.readMessageList[userId] || [])]
          }
        };
      }
      case 'ADD_OLD_READ_MESSAGES':{
        const userId = action.payload.userId;
        return {
          ...prevState,
          readMessageList: {
            ...prevState.readMessageList,
            [userId]: [...(prevState.readMessageList[userId] || []), ...action.payload.messages]
          }
        };
      }
      case 'SET_CURRENT_CHAT_SCREEN':
        return {
          ...prevState,
          currentChatScreen: action.payload.currentUserChatScreen
        };
      default:
        return state;
    }
  };
  const initialChatState: ChatState = {
    currentChatScreen: null,
    chatLists: [],
    unReadMessageList: {},
    readMessageList: {}

  };
  const [state, dispatch] = useReducer(reducer, initialChatState);

  const handleIncomingMessages = (data: any) => {
    console.log('handle incoming message -->', data);
    console.log('screen in user--->', state.currentChatScreen);

    if (state.currentChatScreen !== null) {
      dispatch({ type: 'ADD_NEW_READ_MESSAGES', payload: { userId: data.sender_id, messages: [data] } });
    } else {
      dispatch({ type: 'ADD_UNREAD_MESSAGE', payload: { userId: data.sender_id, message: data } });
    }
  };
  useEffect(() => {
    // create a websocket connection
    if (authContext.state.isSignedIn && authContext.state.userToken) {
      const accessToken = authContext.state.userToken;
      const url = encodeURI(messageServerWebSocketUrl.concat('?Authorization=Bearer ').concat(accessToken));
      webSocketService.current = new WebSocketService(url, handleIncomingMessages);
      webSocketService.current.onOpenWebSocket();
    }

    return () => {
      webSocketService.current?.onCloseWebSocket();
    };
  }, []);

  const sendMessages = (data: WSDTO) => {
    webSocketService.current?.sendMessages(data);
  };

  return (
        <ChatContext.Provider value={{ state, dispatch, sendMessages, handleIncomingMessages }}>
            {children}
        </ChatContext.Provider>
  );
}
