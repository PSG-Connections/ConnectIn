// import { testLoginResponse } from '../constants/common.constant';

import {HttpRequest} from './index';

export async function RegisterUserAPI(data: any) {
  const requestBody = {
    email: data?.email,
    password: data?.password,
    first_name: data?.firstName,
    last_name: data?.lastName,
    phone_number: data?.phone,
  };
  const axiosOptions = {
    url: '/api/user/register',
    method: 'POST',
    data: requestBody,
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}

export async function GetUserByEmailAPI(data: any) {
  const axiosOptions = {
    url: '/api/user/'.concat(data.email),
    method: 'GET',
    headers: {
      Authorization: 'Bearer '.concat(),
    },
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}

export async function CheckEmailExistsAPI(data: any) {
  const axiosOptions = {
    url: '/api/user/exist/'.concat(data.email),
    method: 'GET',
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}

export async function ResetPasswordAPI(data: any) {
  const axiosOptions = {
    url: '/api/user/reset-pwd',
    method: 'PUT',
    data,
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}

export async function UploadAvatarAPI(data: any) {
  const requestBody = {
    image: data,
    email: '19pt33@psgtech.ac.in',
    image_name: '4.png',
    image_type: 'png',
  };
  const axiosOptions = {
    url: '/api/user/profile-image',
    method: 'POST',
    data: requestBody,
    headers: {
      'Content-Type': 'multipart/form-data',
      // Accept: 'multipart/form-data',
    },
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}
