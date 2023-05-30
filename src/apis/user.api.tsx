import { profileServerURL } from '../constants/common.constant';
import { HttpRequest } from './index';

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

export async function DeleteLoggedInUserResume ({ accessToken }: any) {
  const axiosOptions = {
    url: '/api/user/resume',
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function UpdateUserDetails ({ accessToken, newUser }: any) {
  const axiosOptions = {
    url: '/api/user/update',
    method: 'PUT',
    data: newUser,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function UpdateUserEducation ({ accessToken, newUserEducation }: any) {
  const axiosOptions = {
    url: '/api/user/education',
    method: 'PUT',
    data: newUserEducation,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function AddUserEducation ({ accessToken, newUserEducation }: any) {
  const axiosOptions = {
    url: '/api/user/education',
    method: 'POST',
    data: newUserEducation,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function UpdateUserExperience ({ accessToken, newUserExperience }: any) {
  const axiosOptions = {
    url: '/api/user/experience',
    method: 'PUT',
    data: newUserExperience,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function AddUserExperience ({ accessToken, newUserExperience }: any) {
  const axiosOptions = {
    url: '/api/user/experience',
    method: 'POST',
    data: newUserExperience,
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}

export async function GetSearchUserByEmail ({ accessToken, email }: any) {
  const axiosOptions = {
    url: '/api/user/search/'.concat(email),
    method: 'GET',
    headers: {
      Authorization: 'Bearer '.concat(accessToken)
    }
  };
  const mergedConfig = Object.assign(defaultConfig, axiosOptions);
  const response = await HttpRequest(mergedConfig);
  return response;
}
