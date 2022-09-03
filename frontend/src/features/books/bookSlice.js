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
export const getAllBooks = createAsyncThunk('book/getAllBooks', async (page, thunkAPI) => {
  try {
    //return await bookServices.getBooksRequest(page);
    return await bookServices.simulateAsync();
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
      if (action.meta.aborted) {
        // Case were we run an abort() in useEffect cleanup
        state.isError = false;
      } else {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }
    });
  },
});

export const { reset } = bookSlice.actions;

export default bookSlice.reducer;
