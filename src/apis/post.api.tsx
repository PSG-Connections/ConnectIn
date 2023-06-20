import { HttpRequest } from './index';
import { postServerURL } from '../constants/common.constant';

const defaultConfig = {
  baseURL: postServerURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};

export async function GetUserPostsByEmail (data: any) {
  const params = {
    email: data?.email,
    offset: data?.offset,
    limit: data?.limit
  };
  const axiosOptions = {
    url: '/api/post',
    method: 'GET',
    params,
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function DeletePostByPostId ({ accessToken, postId }: any) {
  const reqBody = {
    ID: postId
  };
  const axiosOptions = {
    url: '/api/post',
    method: 'DELETE',
    data: reqBody,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function LikePostByPostId ({ accessToken, postId }: any) {
  const reqBody = {
    post_id: postId
  };
  const axiosOptions = {
    url: '/api/post/like',
    method: 'POST',
    data: reqBody,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function RemoveLikePostByPostId ({ accessToken, postId }: any) {
  const reqBody = {
    post_id: postId
  };
  const axiosOptions = {
    url: '/api/post/like',
    method: 'DELETE',
    data: reqBody,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function GetPostLikesByPostId (data: any) {
  const params = {
    post_id: data?.postId,
    offset: data?.offset,
    limit: data?.limit
  };
  const axiosOptions = {
    url: '/api/post/like',
    method: 'GET',
    params,
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function GetCommentsPostId (data: any) {
  const params = {
    post_id: data?.postId,
    offset: data?.offset,
    limit: data?.limit
  };
  const axiosOptions = {
    url: '/api/post/comment',
    method: 'GET',
    params,
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function AddCommentByPostId (data: any) {
  const reqBody = {
    post_id: data?.postId,
    comment: data?.comment
  };
  const axiosOptions = {
    url: '/api/post/comment',
    method: 'POST',
    data: reqBody,
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function GetPostUploadUrl (data: any) {
  const params = {
    size: data?.size
  };
  const axiosOptions = {
    url: '/api/post/url',
    method: 'GET',
    params,
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function AddPost (data: any) {
  const reqBody = {
    caption: data?.caption
  };
  const axiosOptions = {
    url: '/api/post',
    method: 'POST',
    data: reqBody,
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function GetUserNotifications (data: any) {
  const params = {
    offset: data?.offset,
    limit: data?.limit
  };
  const axiosOptions = {
    url: '/api/notification',
    method: 'GET',
    params,
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}
