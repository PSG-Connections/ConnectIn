// import { testLoginResponse } from '../constants/common.constant';
import { HttpRequest } from './index';
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
  const response = await HttpRequest(axiosOptions);
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
  const response = await HttpRequest(axiosOptions);
  return response;
}
