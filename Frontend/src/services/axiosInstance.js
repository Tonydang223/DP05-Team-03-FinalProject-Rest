import axiosInstance from './axiosInstance.config';

export const fetchUser = async () => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/user/getProfile`);
  return response.data.data;
};
