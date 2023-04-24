import axiosInstance from './axiosInstance.config';

export const fetchUser = () => {
  axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/user/getProfile`);
};
