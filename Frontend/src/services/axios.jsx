import axios from 'axios';

export const loginFunc = async (payload) =>
  axios.post('http://localhost:8888/api/auth/login', payload);
