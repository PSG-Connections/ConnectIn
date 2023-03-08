// import { testLoginResponse } from '../constants/common.constant';
import { HttpRequest } from './index';
export async function RegisterUserAPI (data: any) {
  const axiosOptions = {
    url: '/api/user/register',
    method: 'POST',
    data
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}
