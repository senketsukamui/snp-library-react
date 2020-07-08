import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, getRequest, postRequest, deleteRequest, putRequest } from "agent";

const initialState = {
  booksList: [],
  currentBookId: "",
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
  async (bookId) => {
    deleteRequest(api, bookId);
    return bookId;
  }
);

export const editBookInfo = createAsyncThunk(
  "booksLibrary/editBookInfo",
  async (bookInfo) => {
    const newBookInfo = putRequest(api, bookInfo.id, bookInfo).then((json) => {
      return json;
    });

    return newBookInfo;
  }
);

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
    setModalInputState(state, action) {
      state.modalInputState = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.fulfilled]: (state, action) => {
      state.booksList = action.payload;
    },
    [postBook.fulfilled]: (state, action) => {
      state.booksList.push(action.payload);
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.booksList = state.booksList.filter((book) => {
        return book.id !== action.payload;
      });
    },
    [editBookInfo.fulfilled]: (state, action) => {
      const idx = state.booksList.findIndex((e) => e.id === action.payload.id);
      state.booksList[idx] = action.payload;
    },
  },
});

export const {
  changeCurrentBookId,
  changeModalInputState,
  clearModalInputState,
  setModalInputState,
} = booksLibrary.actions;

export default booksLibrary;
