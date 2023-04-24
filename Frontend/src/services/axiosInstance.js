import axiosInstance from './axiosInstance.config';

export const fetchUser = async () => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/user/getProfile`);
  return response.data.data;
};

// Workspaces
export const fetchWorkspaces = () => {
  axiosInstance.get(`http://localhost:8888/api/workspace/getAll`);
};

// export const fetchAccountRequest = async () => {
//   try {
//     const response = await axiosInstance.get(`http://localhost:8888/api/request/getAll`);
//     console.log(response.data)
//     return { data: response.data };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
