import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, getRequest } from "agent";

const initialState = {
  booksList: [],
  currentBookId: 1,
};

export const fetchBooks = createAsyncThunk(
  "booksLibrary/getBooks",
  async (dispatch) => {
    const fetchedBooks = getRequest(api).then((json) => {
      return json;
    });
    return fetchedBooks;
  }
);

const booksLibrary = createSlice({
  name: "booksLibrary",
  initialState,
  reducers: {
    changeCurrentBookId(state, action) {
      state.currentBookId = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.fulfilled]: (state, action) => {
      state.booksList = action.payload;
    },
  },
});

export const { changeCurrentBookId } = booksLibrary.actions;

export default booksLibrary;
