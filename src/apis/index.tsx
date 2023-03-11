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
      return response?.data;
    })
    .catch(async (error) => {
      if (error.status === 401) {
        const tokenResponse: any = await getNewToken();
        const newToken: string = tokenResponse?.authorization_details?.access_token;
        if (newToken) {
          mergedConfig.headers.Authorization = `Bearer ${newToken}`;
          const retryResponse = await axios.request(mergedConfig)
            .then((response) => {
              return response?.data;
            })
            .catch((error) => {
              return error?.response?.data;
            });
          return retryResponse?.data;
        }
      } else {
        return error?.response?.data;
      }
    });
  return response;
};

export const getNewToken = async () => {
  const session = await getEncryptedItemByKey('user_session');
  if (session === null) {
    return null;
  }
  const rToken: string = session.refreshToken;
  const response = await axios.get(`${serverURL}/api/auth/token`, {
    params: {
      refresh_token: 'Bearer '.concat(rToken)
    }
  }).then((response) => {
    let accessToken;
    if (response.status === 200) {
      accessToken = response?.data;
    }
    return accessToken;
  }).catch((error) => {
    console.log(error?.response?.data);

    return null;
  });
  return response;
};
