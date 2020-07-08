import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, getRequest, postRequest } from "agent";
import BookInfo from "components/BookInfo";

const initialState = {
  booksList: [],
  currentBookId: 1,
  modalInputState: {
    author: "",
    title: "",
    description: "",
    image: "",
  },
};

export const fetchBooks = createAsyncThunk(
  "booksLibrary/getBooks",
  async () => {
    const fetchedBooks = getRequest(api).then((json) => {
      return json;
    });
    return fetchedBooks;
  }
);

export const postBook = createAsyncThunk(
  "booksLibrary/postBook",
  async (bookInfo) => {
    const postedBook = postRequest(api, bookInfo).then((json) => {
      return json;
    });
    return postedBook;
  }
);

export const deleteBook = createAsyncThunk(
  "booksLibrary/deleteBook",
)

const booksLibrary = createSlice({
  name: "booksLibrary",
  initialState,
  reducers: {
    changeCurrentBookId(state, action) {
      state.currentBookId = action.payload;
    },
    changeModalInputState(state, action) {
      state.modalInputState[action.payload.field] = action.payload.value;
    },
    clearModalInputState(state, action) {
      state.modalInputState = initialState.modalInputState;
    },
  },
  extraReducers: {
    [fetchBooks.fulfilled]: (state, action) => {
      state.booksList = action.payload;
    },
    [postBook.fulfilled]: (state, action) => {
      console.log("action", action.payload);
      state.booksList.push(action.payload);
    },
  },
});

export const {
  changeCurrentBookId,
  changeModalInputState,
  clearModalInputState,
} = booksLibrary.actions;

export default booksLibrary;
