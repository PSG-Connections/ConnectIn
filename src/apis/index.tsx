import axios from 'axios';
import { getEncryptedItemByKey } from '../helpers/utils';
import { serverURL } from '../constants/common';

export const apiRequest = async (config: any) => {
  const defaultConfig = {
    baseURL: serverURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };

  const mergedConfig = Object.assign(defaultConfig, config);

  try {
    const response = await axios.request(mergedConfig);

    if (response.status === 401) {
      const newToken = await getNewToken();
      if (newToken) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        mergedConfig.headers.Authorization = `Bearer ${newToken}`;
        const retryResponse = await axios.request(mergedConfig);
        return retryResponse.data;
      }
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getNewToken = async () => {
  try {
    const session = await getEncryptedItemByKey('user_session');
    const rToken: String = session.refreshToken;
    const response = await axios.get(`${serverURL}/auth/token`, {
      params: {
        refresh_token: rToken
      }
    });
    let accessToken;
    if (response.status === 200) {
      accessToken = response?.data?.token?.access_token;
    }
    return accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
