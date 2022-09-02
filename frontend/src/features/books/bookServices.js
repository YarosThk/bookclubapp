// Contains all the API request to the backend in order to get book data
import axios from 'axios';

const BASE_URL = '/api/books/';

export const getBooksRequest = async (page) => {
  const request = await axios({
    method: 'GET',
    url: BASE_URL + `?page=${page}`,
  });

  console.log(request.data);
};

const bookServices = {
  getBooksRequest,
};

export default bookServices;
