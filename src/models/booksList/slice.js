import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  api,
  getRequest,
  getFilteredTodos,
  postRequest,
  deleteRequest,
  putRequest,
} from "agent";

const initialState = {
  booksList: [],
  currentBookId: "",
  isBooksLoading: false,

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

export const fetchTodosWithFilter = createAsyncThunk(
  "booksLibrary/fetchTodosWithFilter",
  async (filterString) => {
    const filteredBooks = getFilteredTodos(api, filterString).then((json) => {
      return json;
    });

    return filteredBooks;
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
      state.isBooksLoading = false;
    },
    [fetchBooks.pending]: (state, action) => {
      state.isBooksLoading = true;
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
    [fetchTodosWithFilter.fulfilled]: (state, action) => {
      state.booksList = action.payload;
      state.isBooksLoading = false;
    },
    [fetchTodosWithFilter.pending]: (state, action) => {
      state.isBooksLoading = true;
    },
  },
});

export const {
  changeCurrentBookId,
} = booksLibrary.actions;

export default booksLibrary;
