// import { testLoginResponse } from '../constants/common.constant';
import { profileServerURL } from '../constants/common.constant';
import { HttpRequest } from './index';
const defaultConfig = {
  baseURL: profileServerURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};

export async function SendOTPAPI (data: any) {
  const requestBody = {
    email: data?.email,
    type: data?.type
  };
  const axiosOptions = {
    url: '/api/user/otp',
    method: 'POST',
    data: requestBody
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function VerifyOTPAPI (data: any) {
  console.log(data);
  const params = {
    email: data?.email,
    otp: data?.otp
  };
  const axiosOptions = {
    url: '/api/user/otp',
    method: 'GET',
    params
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}
