import axios from 'axios';
import { getEncryptedItemByKey } from '../helpers/utils';
import { profileServerURL } from '../constants/common.constant';

export const HttpRequest = async (config: any) => {
  // axios.interceptors.request.use(request => {
  //   console.log('Starting Request', JSON.stringify(request, null, 2));
  //   return request;
  // });
  const response = await axios.request(config)
    .then((response) => {
      return response?.data;
    })
    .catch(async (error) => {
      if (error.status === 401) {
        const tokenResponse: any = await getNewToken();
        const newToken: string = tokenResponse?.authorization_details?.access_token;
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
          const retryResponse = await axios.request(config)
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
  const response = await axios.get(`${profileServerURL}/api/auth/token`, {
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

export const axiosPut = async (data: any) => {
  console.log('----<<<>>>', data);
  const response = await axios.put(data?.url, data?.body, data?.options)
    .then((response) => {
      console.log('response status-->', response.status);
      console.log('response data-->', response.data);
      return response;
    })
    .catch((error) => {
      console.log('axiosPost error --> ', error);
    });
  return response;
};
