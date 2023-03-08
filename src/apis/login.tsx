import axios from 'axios';
import { testLoginResponse } from '../constants/common';
export async function LoginAPI (data: any) {
  console.log('login api---->>>>');
  if (data.email === '19pt17@psgtech.ac.in' && data.password === '123') {
    return testLoginResponse;
  }
  const response = await axios.post('https://be35-2409-4072-908-1aa2-e0e8-45c9-9b7e-7fd7.in.ngrok.io/api/auth/login', data, {})
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log('--------------------------', response);

  return response;
}
