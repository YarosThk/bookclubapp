// Contains all the API request to the backend in order to get book data
import axios from 'axios';

const BASE_URL = '/api/books/';

export const getBooksRequest = async (page) => {
  const request = await axios({
    method: 'GET',
    url: BASE_URL + `?page=${page}`,
  });
  console.log(request.data);
  return request.data;
};

export const simulateAsync = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    payload: [
      {
        _id: '630b5571a693a2a616c1022c',
        user: '63039ee7edbb8bad7b84a108',
        title: 'Veggies for You',
        author: 'Vegan Fox',
        description: 'She ate carrots with ice',
        createdAt: '2022-08-28T11:45:53.158Z',
        updatedAt: '2022-08-28T11:45:53.158Z',
        __v: 0,
      },
      {
        _id: '630b5543a693a2a616c10228',
        user: '63039ee7edbb8bad7b84a108',
        title: 'Holidays',
        author: 'Drew Hollymore',
        description: 'How to spend happy holidays',
        createdAt: '2022-08-28T11:45:07.430Z',
        updatedAt: '2022-08-28T11:45:07.430Z',
        __v: 0,
      },
      {
        _id: '630b5526a693a2a616c10224',
        user: '63039ee7edbb8bad7b84a108',
        title: 'The Man that Walked Alone',
        author: 'Andrew Walker ',
        description: 'He walked a lot for the sake of apple rings ',
        createdAt: '2022-08-28T11:44:38.736Z',
        updatedAt: '2022-08-28T11:44:38.736Z',
        __v: 0,
      },
    ],
    paginationInfo: {
      page: 1,
      totalPages: 4,
      pageSize: 5,
      documentsCount: 16,
    },
  };
};

const bookServices = {
  getBooksRequest,
  simulateAsync,
};

export default bookServices;