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
  async (bookData, thunkAPI) => {}
);
export const udpateComment = createAsyncThunk(
  'comment/udpateComment',
  async (bookData, thunkAPI) => {}
);
export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (bookData, thunkAPI) => {}
);

export const getAllBookComments = createAsyncThunk(
  'comment/getAllBookComments',
  async (reqParams, thunkAPI) => {
    const { bookId, currentPage } = reqParams;
    try {
      return commentsServices.getCommentsByBookRequest(bookId, currentPage);
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
  async (page, thunkAPI) => {
    try {
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
  },
});

export const { resetComments } = commentSlice.actions;

export default commentSlice.reducer;
