import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookServices from './bookServices';

const initialState = {
  books: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
  message: '',
};
export const getAllBooks = createAsyncThunk('book/getAllBooks', async (page, thunkAPI) => {
  page = 1;
  try {
    return await bookServices.getBooksRequest(page);
  } catch (error) {
    console.log(error);
    // thunk api with error message
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString(); //if any of those exists we want to put that in message variable
    return thunkAPI.rejectWithValue(message); //will return the payload with error message
  }
});

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: {},
});

export const { reset } = bookSlice.actions;

export default bookSlice.reducer;
