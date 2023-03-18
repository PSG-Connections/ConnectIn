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
  data && console.log('DATA ----------->', data.get('uri'));
  const axiosOptions = {
    url: '/api/user/profile-image',
    method: 'POST',
    data: data,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQU0cgSW5zdGl0dXRpb24iLCJhdWQiOlsiUFNHIl0sImV4cCI6MTY3ODk2MzI2MiwiaWF0IjoxNjc4ODc2ODYyLCJFbWFpbCI6IjE5cHQyOUBwc2d0ZWNoLmFjLmluIn0.Phfm7rH7qq73z1NjmmJn_PYDKrY6pU2NJMMqx_j74_vPhc0XKiUj_gcxCFw5zn49_s1hvnkoHpQ1OhmwVPSVm13wfDrRZwInduQJbwvS9gur1DgA2ylPK0Li8LSTfHvUAe76uuXbqPuJkcCqHoisK4Ee68fp-mlu5UN4NiQZqol8r3Q74Zu6arLTTdj_bb8VQFjd2nX6L7MOkciF-ceZkzMTNuYR3Mz41sbknR0doxpUF-Pz5MuBUVMWTlbQQoJMK07sISODLTOWb7cSeoR2dm2FzYuMZowm7cq72A9zdQLcAvrh3PO-9novwY4E3dhUOHQCEt65NxQ3B50MyQRaug',
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await HttpRequest(axiosOptions);
  return response;
}
