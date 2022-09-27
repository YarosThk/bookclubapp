import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookServices from './bookServices';

const initialState = {
  books: [],
  pagination: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const createBook = createAsyncThunk('book/createBook', async (bookData, thunkAPI) => {});
export const udpateBook = createAsyncThunk('book/udpateBook', async (bookData, thunkAPI) => {});
export const deleteBook = createAsyncThunk('book/deleteBook', async (bookData, thunkAPI) => {});

export const getAllBooks = createAsyncThunk('book/getAllBooks', async (page, thunkAPI) => {
  try {
    return await bookServices.getBooksRequest(page);
  } catch (error) {
    // thunk api with error message
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString(); //if any of those exists we want to put that in message variable
    return thunkAPI.rejectWithValue(message); //will return the payload with error message
  }
});

export const getBooksByUser = createAsyncThunk(
  'book/getBooksByUser',
  async (requestData, thunkAPI) => {
    try {
      const { userId, page } = requestData;
      const token = thunkAPI.getState().auth.user.token;
      return await bookServices.getBooksByUserRequest(userId, page, token);
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

export const getSpecificBook = createAsyncThunk(
  'book/getSpecificBook',
  async (bookId, thunkAPI) => {
    try {
      return await bookServices.getBookByIdRequest(bookId);
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

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.books = [...action.payload.payload];
      state.pagination = action.payload.paginationInfo;
    });
    builder.addCase(getAllBooks.rejected, (state, action) => {
      // Case were we run an abort() in useEffect cleanup
      // Update state unless request was aborted while running
      if (!action.meta.aborted) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }
    });
    builder.addCase(getSpecificBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSpecificBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.books.push(action.payload);
    });
    builder.addCase(getSpecificBook.rejected, (state, action) => {
      // Case were we run an abort() in useEffect cleanup
      // Update state unless request was aborted while running
      if (!action.meta.aborted) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }
    });
    builder.addCase(getBooksByUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBooksByUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.books = [...action.payload.payload];
      state.pagination = action.payload.paginationInfo;
    });
    builder.addCase(getBooksByUser.rejected, (state, action) => {
      // Case were we run an abort() in useEffect cleanup
      // Update state unless request was aborted while running
      if (!action.meta.aborted) {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }
    });
  },
});

export const { reset } = bookSlice.actions;

export default bookSlice.reducer;
