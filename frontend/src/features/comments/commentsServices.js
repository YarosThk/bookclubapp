// Contains all the API request to the backend in order to get comments data
import axios from 'axios';

const BASE_URL = 'https://bookclub-api.onrender.com/api/comments/';
const BASE_BOOK_URL = 'https://bookclub-api.onrender.com/api/books/';
const BASE_USER_URL = 'https://bookclub-api.onrender.com/api/users/';

const createCommentRequest = async (comment, bookId, token) => {
  const response = await axios({
    method: 'POST',
    url: BASE_URL + bookId,
    data: {
      commentBody: comment,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getCommentsByBookRequest = async (bookId, page) => {
  const response = await axios({
    method: 'GET',
    url: BASE_BOOK_URL + bookId + `/comments?page=${page}`,
  });

  return response.data;
};

const getCommentsByUserRequest = async (userId, page, token) => {
  const response = await axios({
    method: 'GET',
    url: BASE_USER_URL + userId + `/comments?page=${page}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getCommentByIdRequest = async (commentId, token) => {
  const response = await axios({
    method: 'GET',
    url: BASE_URL + commentId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateCommentRequest = async (comment, commentId, token) => {
  const response = await axios({
    method: 'PUT',
    url: BASE_URL + commentId,
    data: {
      commentBody: comment,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteCommentRequest = async (commentId, token) => {
  const response = await axios({
    method: 'DELETE',
    url: BASE_URL + commentId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const commentsServices = {
  getCommentsByBookRequest,
  getCommentsByUserRequest,
  getCommentByIdRequest,
  createCommentRequest,
  updateCommentRequest,
  deleteCommentRequest,
};

export default commentsServices;
