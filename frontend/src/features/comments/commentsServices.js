// Contains all the API request to the backend in order to get comments data
import axios from 'axios';

const getCommentsByBookRequest = async (bookId, page) => {
  const response = await axios({
    method: 'GET',
    url: `/api/books/${bookId}/comments?page=${page}`,
    // URL below sends request to endpoint below, and gives 404
    // http://localhost:3000/books/api/books/631505e768c8a2b65aec541b/comments
    // url: `api/books/${bookId}/comments`,
  });
  return response.data;
};

const getCommentsByUser = async (userId, page, token) => {
  // needs also pagination
  // const page = 1;
  const response = await axios({
    method: 'GET',
    url: `/api/users/${userId}/comments?page=${page}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createCommentRequest = async (comment, bookId, token) => {
  const response = await axios({
    method: 'POST',
    url: `/api/comments/${bookId}`,
    data: {
      commentBody: comment,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const commentsServices = { getCommentsByBookRequest, getCommentsByUser, createCommentRequest };

export default commentsServices;
