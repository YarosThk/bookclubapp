// Contains all the API request to the backend in order to get comments data
import axios from 'axios';

// const BASE_URL = 'api/comments/';
// const USER_COMMENTS_URL = 'api/users/:userId/comments';

const getCommentsByBookRequest = async (bookId, page) => {
  const response = await axios({
    method: 'GET',
    url: `/api/books/${bookId}/comments?page=${page}`,
    // URL below sends request to endpoint below, and gives 404
    // http://localhost:3000/books/api/books/631505e768c8a2b65aec541b/comments
    // url: `api/books/${bookId}/comments`,
  });
  console.log(response.data);
  return response.data;
};

const commentsServices = { getCommentsByBookRequest };

export default commentsServices;
