import { testLoginResponse } from '../constants/common';
import { HttpRequest } from './index';
export async function LoginAPI (data: any) {
  console.log('login api---->>>>');
  if (data.email === '19pt17@psgtech.ac.in' && data.password === '123') {
    return testLoginResponse;
  }
  const axiosOptions = {
    url: '/api/auth/login',
    data
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}
