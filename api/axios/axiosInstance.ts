import axios from 'axios';
import { getCookie } from 'cookies-next';

const axiosInstance = axios.create({
  baseURL: 'https://ualate.com/api',
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.data?.meta?.code === 401) {
//       return Promise.reject(error);
//     }
//
//     return Promise.reject((error.response && error.response.data) || 'Something went wrong.');
//   }
// );

axiosInstance.interceptors.request.use(
  (config) => {
    if(getCookie('access-token')) {
      config.headers.Authorization = "Token " + getCookie('access-token')
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
