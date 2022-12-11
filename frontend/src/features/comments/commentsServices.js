// Contains all the API request to the backend in order to get comments data
import axios from 'axios';

const getCommentsByBookRequest = async (bookId, page) => {
  const response = await axios({
    method: 'GET',
    url: `/api/books/${bookId}/comments?page=${page}`,
  });
  return response.data;
};

const getCommentsByUserRequest = async (userId, page, token) => {
  const response = await axios({
    method: 'GET',
    url: `/api/users/${userId}/comments?page=${page}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getCommentByIdRequest = async (commentId, token) => {
  const response = await axios({
    method: 'GET',
    url: `/api/comments/${commentId}`,
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

const updateCommentRequest = async (comment, commentId, token) => {
  const response = await axios({
    method: 'PUT',
    url: `/api/comments/${commentId}`,
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
    url: `/api/comments/${commentId}`,
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
