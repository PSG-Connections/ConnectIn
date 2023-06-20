import { messageServerUrl } from '../constants/common.constant';
import { HttpRequest } from './index';

const defaultConfig = {
  baseURL: messageServerUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};

export async function GetAllRecentsChats (data: any) {
  const params = {
    offset: data?.offset,
    limit: data?.limit
  };
  const axiosOptions = {
    url: '/chat/list',
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

export async function GetChatHistoryByUser (data: any) {
  const params = {
    offset: data?.offset,
    limit: data?.limit
  };
  const axiosOptions = {
    url: '/api/history',
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
