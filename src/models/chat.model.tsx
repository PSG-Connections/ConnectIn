export interface UserToMessages{
  [userId: number]: WSDTO[]
}

export interface Message {
  id: string
  sender: string
  message: string
  timestamp: number
  isRead: boolean
  // Add any other properties specific to a message
}

export interface WSDTO {
  sender_id: number
  sender: string
  message: string
  receiver: string
  receiver_id: number
}

export interface ChatList {
  message: string
  email: string
  user_id: number
  first_name: string
  last_name: string
  profile_image: string
}

export interface ChatState {
  chatLists: ChatList[]
  unReadMessageList: UserToMessages
  readMessageList: UserToMessages
  currentChatScreen: null | number // currentChatScreen denotes which user's(userId) chat screen the user is in
}

export interface ChatAction {type: string, payload: any}
