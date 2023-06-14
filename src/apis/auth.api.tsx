import { profileServerURL } from '../constants/common.constant';
import { HttpRequest } from './index';
const defaultConfig = {
  baseURL: profileServerURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};

export async function LoginAPI (data: any) {
  const requestBody = {
    email: data?.email,
    password: data?.password
  };

  const axiosOptions = {
    url: '/api/auth/login',
    method: 'POST',
    data: requestBody
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export const CreateFCMToken = async ({ data, accessToken }: any) => {
  const axiosOptions = {
    url: '/api/firebase/token',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
};

export const UpdateFCMToken = async ({ data, accessToken }: any) => {
  const axiosOptions = {
    url: '/api/firebase/token',
    method: 'PUT',
    data,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
};

export const DeleteFCMToken = async ({ data, accessToken }: any) => {
  const axiosOptions = {
    url: '/api/firebase/token',
    method: 'DELETE',
    data,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
};
