import axiosInstance from './axiosInstance.config';
import { Alert } from 'antd';

export const fetchUser = async () => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/user/getProfile`);
  return response.data.data;
};

export const editProfile = async (data) => {
  const response = await axiosInstance.post(
    `http://localhost:8888/api/user/update`,
    JSON.stringify(data.values),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return alert(response.data.message);
};
//Staff
export const logOffForm = async (data) => {
  const response = await axiosInstance.post(
    `http://localhost:8888/api/request/create`,
    JSON.stringify(data),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return alert(response.data.message);
};

export const changePasswordUser = async (data) => {
  const response = await axiosInstance.post(
    `http://localhost:8888/api/auth/changePassword`,
    JSON.stringify(data.values),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return alert(response.data.message);
};

// Group
export const fetchGroup = async () => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/group/getAll`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const detailGroup = async (id) => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/group/getDetail/${id}`,
  );
  return response.data.data;
};
export const addGroup = async (initialValuesCreateGroup) => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_BASE_URL}/group/create`,
    JSON.stringify(initialValuesCreateGroup),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return alert(response.data.message);
};
export const UpdateGroup = async (valuesUpdateGroup) => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_BASE_URL}/group/update/${valuesUpdateGroup._id}`,
    JSON.stringify(valuesUpdateGroup),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return alert(response.data.message);
};
//Get all user
export const AllUser = async () => {
  const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/user/getAll`);
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
  return alert(response.data.message);
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
  return alert(response.data.message);
};

export const editWorkspace = async (data) => {
  const response = await axiosInstance.post(
    `http://localhost:8888/api/workspace/update/${data.id}`,
    JSON.stringify(data.values),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return alert(response.data.message);
};

export const addManager = async (data) => {
  const json = {
    email: data.values.email,
    firstName: data.values.firstName,
    lastName: data.values.lastName,
    password: data.values.password,
    slackId: data.values.slackId,
    role: 'Manager',
    idWs: data.id,
  };

  const response = await axiosInstance.post(
    `http://localhost:8888/api/user/create`,
    JSON.stringify(json),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return alert(response.data.message);
};

export const deleteManager = async (data) => {
  const json = { managerId: data.manager, id_workspace: data.id };
  const response = await axiosInstance.post(
    `http://localhost:8888/api/user/delete/${json.managerId}`,
    JSON.stringify(json),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return alert(response.data.message);
};

export const resetPasswordManager = async (data) => {
  const json = { idUser: data.manager, password: data.values.password };
  const response = await axiosInstance.post(
    `http://localhost:8888/api/auth/resetPassword`,
    JSON.stringify(json),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return alert(response.data.message);
};

// fetch account request
export const fetchAccountRequest = async () => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/request/getAll`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchInfoUser = async () => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/user/getAll`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error();
    throw error;
  }
};

export const fetchApprove = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/request/getApproves/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//manager members
export const fetchMember = async () => {
  const response = await axiosInstance.get(`http://localhost:8888/api/user/getAll`);
  return response.data.data;
};
export const approveRequest = async (requestId, typeApprove) => {
  return await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/request/approve/${requestId}`, {
    type_approve: typeApprove,
  });
};

export const revertRequest = async (requestId) => {
  return await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/request/revert/${requestId}`);
};

export const updateRequest = async (data) => {
  const { requestId, values } = data;

  const response = await axiosInstance.post(
    `${import.meta.env.VITE_BASE_URL}/request/update/${requestId}`,
    JSON.stringify(values),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const addMember = async (data) => {
  const json = {
    email: data.values.email,
    firstName: data.values.firstName,
    lastName: data.values.lastName,
    password: data.values.password,
    slackId: data.values.slackId,
  };

  const response = await axiosInstance.post(
    `http://localhost:8888/api/user/create`,
    JSON.stringify(json),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return alert(response.data.message);
};

export const fetchDayoffDetails = async (id) => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/request/getDetail/${id}`,
  );
  return alert(response.data.message);
};

export const fetchDayoffHistory = async (id) => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/request/getHistories/${id}`,
  );
  return response.data.data;
};

export const approveFunc = async (id) => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_BASE_URL}/request/approve/${id}`,
  );
  return response.data.data;
};

export const revertFunc = async (id) => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_BASE_URL}/request/revert/${id}`,
  );
  return response.data.data;
};
