import { profileServerURL } from '../constants/common.constant';
import { HttpRequest } from './index';

const defaultConfig = {
  baseURL: profileServerURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};

export async function FollowUser ({ accessToken, email }: any) {
  const requestBody = {
    email
  };
  const axiosOptions = {
    url: '/api/user/follow',
    method: 'POST',
    data: requestBody,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function UnFollowUser ({ accessToken, email }: any) {
  const requestBody = {
    email
  };
  const axiosOptions = {
    url: '/api/user/unfollow',
    method: 'POST',
    data: requestBody,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}
