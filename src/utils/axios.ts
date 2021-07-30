import { message } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { throttle } from 'lodash';
import { auth } from '../stores';
import { getError } from '../utils/get-errors';

const errorWhiteList = ['MAL0001', 'invalid_grant', 'TRAN0006'];

export const basicAxios = axios.create({
  baseURL: process.env.API_PATH,
  timeout: 20000,
});
basicAxios.interceptors.response.use(
  response => response.data,
  error => {
    const err = getError(error.response);
    return Promise.reject(err);
  },
);

export const authAxios = axios.create({
  baseURL: process.env.API_PATH,
});

const axiosResponseSuccessInterceptors = (response: AxiosResponse) =>
  response.data;

const redirectToLogin = throttle(() => window.location.replace('/login'));

const authResponseErrorInterceptors = (axiosError: AxiosError) => {
  if (auth && axiosError) {
    if (!axiosError.response) {
      return Promise.reject(axiosError);
    }
    const error = getError(axiosError.response);
    if (errorWhiteList.indexOf(error.code) > -1) {
      return Promise.reject(axiosError);
    }
    switch (error.status) {
      case 401:
      case 404:
        message.error('地址信息未找到');
        break;
      case 403:
        message.error('登录超时');
        // ! route to login page after 1.5s
        setTimeout(redirectToLogin, 1500);
        break;
      default:
        message.error(error.message);
    }
  } else {
    message.error('network_error');
  }
  return Promise.reject(axiosError);
};

authAxios.interceptors.response.use(
  axiosResponseSuccessInterceptors,
  authResponseErrorInterceptors,
);
