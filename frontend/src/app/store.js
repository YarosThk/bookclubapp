import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookReducer from '../features/books/bookSlice';
import commentReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
    comment: commentReducer,
  },
});
