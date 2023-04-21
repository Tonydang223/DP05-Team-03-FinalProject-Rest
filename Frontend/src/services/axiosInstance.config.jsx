import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    const access_token = localStorage.getItem('access_token');
    config.headers.access_token = access_token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
