import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentsServices from './commentsServices';

const initialState = {
  comments: [],
  paginationComments: {},
  isLoadingComments: false,
  isErrorComments: false,
  isSuccessComments: false,
  messageComments: '',
};
export const createComment = createAsyncThunk(
  'comment/createComment',
  async (bookData, thunkAPI) => {
    try {
      const { text, bookId } = bookData;
      const token = thunkAPI.getState().auth.user.token;
      return await commentsServices.createCommentRequest(text, bookId, token);
    } catch (error) {
      // thunk api with error message
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString(); //if any of those exists we want to put that in message variable
      return thunkAPI.rejectWithValue(message); //will return the payload with error message
    }
  }
);

// export const udpateComment = createAsyncThunk(
//   'comment/udpateComment',
//   async (bookData, thunkAPI) => {}
// );
// export const deleteComment = createAsyncThunk(
//   'comment/deleteComment',
//   async (bookData, thunkAPI) => {}
// );

export const getAllBookComments = createAsyncThunk(
  'comment/getAllBookComments',
  async (reqParams, thunkAPI) => {
    const { bookId, currentPage } = reqParams;
    try {
      return await commentsServices.getCommentsByBookRequest(bookId, currentPage);
    } catch (error) {
      // thunk api with error message
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString(); //if any of those exists we want to put that in message variable
      return thunkAPI.rejectWithValue(message); //will return the payload with error message
    }
  }
);

export const getAllUserComments = createAsyncThunk(
  'comment/getAllUserComments',
  async (requestData, thunkAPI) => {
    try {
      const { userId, page } = requestData;
      const token = thunkAPI.getState().auth.user.token;
      return await commentsServices.getCommentsByUserRequest(userId, page, token);
    } catch (error) {
      // thunk api with error message
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString(); //if any of those exists we want to put that in message variable
      return thunkAPI.rejectWithValue(message); //will return the payload with error message
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (commentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentsServices.deleteCommentRequest(commentId, token);
    } catch (error) {
      // thunk api with error message
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString(); //if any of those exists we want to put that in message variable
      return thunkAPI.rejectWithValue(message); //will return the payload with error message
    }
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetComments: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBookComments.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(getAllBookComments.fulfilled, (state, action) => {
      state.isLoadingComments = false;
      state.isSuccessComments = true;
      state.comments = [...action.payload.payload];
      state.paginationComments = action.payload.paginationInfo;
    });
    builder.addCase(getAllBookComments.rejected, (state, action) => {
      // Case were we run an abort() in useEffect cleanup
      // Update state unless request was aborted while running
      if (!action.meta.aborted) {
        state.isLoadingComments = false;
        state.isErrorComments = true;
        state.messageComments = action.payload;
      }
    });
    builder.addCase(getAllUserComments.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(getAllUserComments.fulfilled, (state, action) => {
      state.isLoadingComments = false;
      state.isSuccessComments = true;
      state.comments = [...action.payload.payload];
      state.paginationComments = action.payload.paginationInfo;
    });
    builder.addCase(getAllUserComments.rejected, (state, action) => {
      // Case were we run an abort() in useEffect cleanup
      // Update state unless request was aborted while running
      if (!action.meta.aborted) {
        state.isLoadingComments = false;
        state.isErrorComments = true;
        state.messageComments = action.payload;
      }
    });
    builder.addCase(createComment.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoadingComments = false;
      state.isSuccessComments = true;
      state.comments.unshift(action.payload.payload);
    });
    builder.addCase(createComment.rejected, (state, action) => {
      // Case were we run an abort() in useEffect cleanup
      // Update state unless request was aborted while running
      if (!action.meta.aborted) {
        state.isLoadingComments = false;
        state.isErrorComments = true;
        state.messageComments = action.payload;
      }
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoadingComments = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoadingComments = false;
      state.isSuccessComments = true;
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload.payload._id
      );
      state.messageComments = action.payload.message;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      // Case were we run an abort() in useEffect cleanup
      // Update state unless request was aborted while running
      if (!action.meta.aborted) {
        state.isLoadingComments = false;
        state.isErrorComments = true;
        state.messageComments = action.payload;
      }
    });
  },
});

export const { resetComments } = commentSlice.actions;

export default commentSlice.reducer;
