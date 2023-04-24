import axios from 'axios';

export const loginFunc = async (payload) =>
  axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, payload);
