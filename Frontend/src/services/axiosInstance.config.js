import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    const authorization = localStorage.getItem('access_token');
    config.headers.authorization = `Bearer ${authorization}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
