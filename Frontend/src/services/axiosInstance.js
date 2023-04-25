import axiosInstance from './axiosInstance.config';

export const fetchUser = async () => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/user/getProfile`);
  return response.data.data;
};

// Workspaces
export const fetchWorkspaces = async () => {
  const response = await axiosInstance.get(`http://localhost:8888/api/workspace/getAll`);
  return response.data.data;
};

export const detailWorkspace = async (id) => {
  const response = await axiosInstance.get(`http://localhost:8888/api/workspace/getDetail/${id}`);
  return response.data.data;
};

export const addWorkspace = async (workspaceData) => {
  const response = await axiosInstance.post(
    `http://localhost:8888/api/workspace/create`,
    JSON.stringify(workspaceData.values),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data.data;
};

export const setWorkspaceStatus = async (data) => {
  const response = await axiosInstance.post(
    `http://localhost:8888/api/workspace/changeStatus/${data.id}`,
    JSON.stringify(data.values),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data.data;
};
