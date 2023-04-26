import { profileServerURL } from '../constants/common.constant';
import { HttpRequest } from './index';
import RNFetchBlob from 'react-native-blob-util';

const defaultConfig = {
  baseURL: profileServerURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};

export async function RegisterUserAPI (data: any) {
  const requestBody = {
    email: data?.email,
    password: data?.password,
    first_name: data?.firstName,
    last_name: data?.lastName,
    phone_number: data?.phone
  };
  const axiosOptions = {
    url: '/api/user/register',
    method: 'POST',
    data: requestBody
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function GetUserByEmailAPI (data: any) {
  const axiosOptions = {
    url: '/api/user/'.concat(data.email),
    method: 'GET',
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function GetLoggedInUserAPI (data: any) {
  const axiosOptions = {
    url: '/api/user',
    method: 'GET',
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function CheckEmailExistsAPI (data: any) {
  const axiosOptions = {
    url: '/api/user/exist/'.concat(data.email),
    method: 'GET'
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function ResetPasswordAPI (data: any) {
  const axiosOptions = {
    url: '/api/user/reset-pwd',
    method: 'PUT',
    data
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function UploadAvatarAPI (data: any) {
  console.log('DATA ----------->', data.formdata);
  const axiosOptions = {
    url: '/api/user/profile-image',
    method: 'POST',
    data: data.formdata,
    headers: {
      Authorization:
        'Bearer '.concat(data.accessToken),
      'Content-Type': 'multipart/form-data'
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function SearchUser (data: any) {
  const params = {
    search: data?.searchValue,
    offset: data?.offset,
    limit: data?.limit
  };
  const axiosOptions = {
    url: '/api/user/search',
    method: 'GET',
    params,
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function GetUserResumeUploadUrl (data: any) {
  const axiosOptions = {
    url: '/api/user/resume/upload',
    method: 'GET',
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function GetLoggedInUserResumeUrl (data: any) {
  const axiosOptions = {
    url: '/api/user/resume',
    method: 'GET',
    headers: {
      Authorization: 'Bearer '.concat(data.accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function UploadResumeToCloud ({ presignedUrl, Fileuri }: any) {
  RNFetchBlob.fetch(
    'PUT',
    presignedUrl,
    {
      'Content-Type': 'application/pdf'
    },
    RNFetchBlob.wrap(Fileuri)
  )
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
}
