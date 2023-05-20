import { Asset } from 'react-native-image-picker';

export interface Post {
  id: number
  post_name: string
  caption: string
  create_at: string
  likes: number
  liked: boolean
  comments: number
  count: number
  MetaData: MetaData[]
}

export interface MetaData {
  url: string
  type: string
}

export interface Comment {
  user_id: number
  email: string
  profile_image_url: string
  created_at: string
  comment: string
}

type MediaType = 'photo' | 'video';

export interface MediaUpload {
  type: MediaType
  media: Asset
}
