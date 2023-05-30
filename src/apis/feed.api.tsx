import { HttpRequest } from './index';
import { newsFeedServerURL } from '../constants/common.constant';

const defaultConfig = {
  baseURL: newsFeedServerURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};

export async function GetUserFeed (data: any) {
  const params = {
    offset: data?.offset,
    limit: data?.limit
  };
  const axiosOptions = {
    url: '/api/news-feed/get',
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
