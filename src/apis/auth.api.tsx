import { testLoginResponse } from '../constants/common.constant';
import { HttpRequest } from './index';
export async function LoginAPI (data: any) {
  if (data.email === '19pt17@psgtech.ac.in' && data.password === '123') {
    return testLoginResponse;
  }
  const axiosOptions = {
    url: '/api/auth/login',
    method: 'POST',
    data
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}
