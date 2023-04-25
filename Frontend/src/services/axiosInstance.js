import axiosInstance from './axiosInstance.config';

export const fetchUser = async () => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/user/getProfile`);
  return response.data.data;
};

// Workspaces
export const fetchWorkspaces = () => {
  axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/workspace/getAll`);
};

// fetch account request
export const fetchAccountRequest = async () => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/request/getAll`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchInfoUser = async () => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/user/getAll`);
    console.log(response.data)
    return response.data;
  }
  catch(error)
  {
    console.error();
    throw error;
  }
}


