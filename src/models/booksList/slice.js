import { createSlice } from "@reduxjs/toolkit";
import { actionTypes } from "utils";
const initialState = {
  booksList: [],
  currentBookId: "",
  isBooksLoading: false,
  error: false,
};

const booksLibrary = createSlice({
  name: "booksLibrary",
  initialState,
  reducers: {
    changeCurrentBookId(state, { payload }) {
      state.currentBookId = payload;
    },
    fetchBooksStart(state) {
      state.isBooksLoading = true;
    },
    fetchBooksSuccess(state, action) {
      state.booksList = action.payload;
      state.isBooksLoading = false;
    },
    fetchBooksFailed(state) {
      state.error = true;
    },
    postBookStart(state) {
      state.isBooksLoading = true;
    },
    postBookSuccess(state, { payload }) {
      state.isBooksLoading = false;
      state.booksList.push(payload);
    },
    postBookFailed(state) {
      state.error = false;
    },
    deleteBookStart(state, { payload }) {
      state.isBooksLoading = true;
    },
    deleteBookSuccess(state, { payload }) {
      state.isBooksLoading = false;
      state.booksList = state.booksList.filter((book) => {
        return book.id !== payload;
      });
    },
    deleteBookFailed(state) {
      state.error = true;
    },
    editBookStart(state) {
      state.isBooksLoading = true;
    },
    editBookSuccess(state, { payload }) {
      state.isBooksLoading = false;
      const idx = state.booksList.findIndex((e) => e.id === payload.id);
      state.booksList[idx] = payload;
    },
    editBookFailed(state) {
      state.error = true;
    },
    fetchBooksWithFilterStart(state) {
      state.isBooksLoading = true;
    },
    fetchBooksWithFilterSuccess(state, { payload }) {
      state.booksList = payload;
      state.isBooksLoading = false;
    },
    fetchBooksWithFilterFailed(state) {
      state.error = true;
    },
  },
});

export const {
  changeCurrentBookId,
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailed,
  postBookStart,
  postBookFailed,
  postBookSuccess,
  deleteBookStart,
  deleteBookFailed,
  deleteBookSuccess,
  editBookFailed,
  editBookStart,
  editBookSuccess,
  fetchBooksWithFilterStart,
  fetchBooksWithFilterSuccess,
  fetchBooksWithFilterFailed,
} = booksLibrary.actions;

export const actions = actionTypes(booksLibrary.actions);

export default booksLibrary;
