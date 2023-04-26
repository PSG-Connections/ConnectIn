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
