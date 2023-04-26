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
    console.log(response.data);
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

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error();
    throw error;
  }
};

//manager members
export const fetchMember = async () => {
  const response = await axiosInstance.get(`http://localhost:8888/api/user/getAll`);
  return response.data.data;
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
