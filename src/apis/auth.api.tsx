import { HttpRequest } from './index';
export async function LoginAPI (data: any) {
  const axiosOptions = {
    url: '/api/auth/login',
    method: 'POST',
    data
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}
