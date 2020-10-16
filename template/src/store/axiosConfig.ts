import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export type CustomAxiosInstance = { (config: AxiosRequestConfig): AxiosPromise };

export default axios.create({
  baseURL: 'https://some.com/api',
});
