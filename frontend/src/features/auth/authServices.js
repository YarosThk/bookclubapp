import axios from 'axios';

const BASE_URL = '/api/users/';

const registerRequest = async (userData) => {
  const response = await axios({ method: 'POST', url: BASE_URL, data: userData });
  if (response.data) {
    //Response request worked, store user and token in localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const loginRequest = async (userData) => {
  const response = await axios({
    method: 'POST',
    url: BASE_URL + 'login',
    data: userData,
  });
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

const logoutRequest = () => {
  localStorage.removeItem('user');
};

const authServices = {
  registerRequest,
  loginRequest,
  logoutRequest,
};
export default authServices;
