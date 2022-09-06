import axios from 'axios';

const BASE_URL = '/api/users/';

const loginRequest = async (userData) => {
  const response = await axios({
    method: 'POST',
    url: BASE_URL + '/login',
    data: userData,
  });
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

const authServices = {
  loginRequest,
};
export default authServices;
