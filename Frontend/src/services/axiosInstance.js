import axiosInstance from './axiosInstance.config';

export const fetchUser = () => {
  axiosInstance.get(`http://localhost:8888/api/auth`);
};
