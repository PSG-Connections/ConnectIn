import {HttpRequest} from './index';

export async function LoginAPI(data: any) {
  const requestBody = {
    email: data?.email,
    password: data?.password,
  };

  const axiosOptions = {
    url: '/api/auth/login',
    method: 'POST',
    data: requestBody,
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}
