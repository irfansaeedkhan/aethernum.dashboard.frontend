import axios from 'axios';
import { APIBaseURL, APIBaseURLBlockchain } from '@/constants/base-urls';
import {
  registerAuthTokenRequestInterceptor,
  registerAuthTokenResponseInterceptor,
} from './auth-tokens-interceptors';

export const axiosAPI = axios.create({
  baseURL: APIBaseURL,
});
export const axiosAPIBlockchain = axios.create({
  baseURL: APIBaseURLBlockchain,
});

registerAuthTokenRequestInterceptor(axiosAPI);
registerAuthTokenRequestInterceptor(axiosAPIBlockchain);

registerAuthTokenResponseInterceptor(axiosAPI);
registerAuthTokenResponseInterceptor(axiosAPIBlockchain);
