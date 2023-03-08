import axios from 'axios';
import { getEncryptedItemByKey } from '../helpers/utils';
import { serverURL } from '../constants/common.constant';

export const HttpRequest = async (config: any) => {
  const defaultConfig = {
    baseURL: serverURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };

  const mergedConfig = Object.assign(defaultConfig, config);

  const response = await axios.request(mergedConfig)
    .then((response) => {
      console.log('correct response --> ', response);
      return response.data;
    })
    .catch(async (error) => {
      console.log('error in request -->', error.response.data);
      if (error.status === 401) {
        const newToken: string = await getNewToken();
        if (newToken) {
          mergedConfig.headers.Authorization = `Bearer ${newToken}`;
          const retryResponse = await axios.request(mergedConfig)
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              return error.response.data;
            });
          return retryResponse;
        }
      } else {
        return error.response.data;
      }
    });
  return response;
};

export const getNewToken = async () => {
  const session = await getEncryptedItemByKey('user_session');
  if (session === null) {
    return null;
  }
  const rToken: String = session.refreshToken;
  const response = await axios.get(`${serverURL}/auth/token`, {
    params: {
      refresh_token: rToken
    }
  }).then((response) => {
    let accessToken;
    if (response.status === 200) {
      accessToken = response?.data?.token?.access_token;
    }
    return accessToken;
  }).catch(() => {
    return null;
  });
  return response;
};
