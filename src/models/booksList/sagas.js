import {
  getRequest,
  api,
  postRequest,
  putRequest,
  getFilteredTodos,
  deleteRequest,
} from "agent";
import {
  fetchBooksSuccess,
  fetchBooksFailed,
  postBookSuccess,
  postBookFailed,
  editBookSuccess,
  editBookFailed,
  fetchBooksWithFilterSuccess,
  fetchBooksWithFilterFailed,
  fetchBooksStart,
  postBookStart,
  editBookStart,
  deleteBookStart,
  deleteBookSuccess,
  deleteBookFailed,
  fetchBooksWithFilterStart,
} from "models/booksList/slice";
import { put, takeEvery, call } from "redux-saga/effects";

function* fetchBooksEffect() {
  try {
    const books = yield call(getRequest, api);
    yield put(fetchBooksSuccess(books));
  } catch (error) {
    yield put(fetchBooksFailed());
  }
}

function* postBookEffect(action) {
  try {
    const postedBook = yield call(postRequest, api, action.payload);
    yield put(postBookSuccess(postedBook));
  } catch (error) {
    yield put(postBookFailed());
  }
}

function* editBookEffect(action) {
  try {
    const newBookInfo = yield call(
      putRequest,
      api,
      action.payload.id,
      action.payload
    );
    yield put(editBookSuccess(newBookInfo));
  } catch (error) {
    yield put(editBookFailed());
  }
}

function* deleteBookEffect(action) {
  try {
    yield call(deleteRequest, api, action.payload);
    yield put(deleteBookSuccess(action.payload));
  } catch (error) {
    yield put(deleteBookFailed());
  }
}

function* fetchBooksWithFilterEffect(action) {
  try {
    const filteredBooks = yield call(getFilteredTodos, api, action.payload);
    yield put(fetchBooksWithFilterSuccess(filteredBooks));
  } catch (error) {
    yield put(fetchBooksWithFilterFailed());
  }
}

function* booksWorkers() {
  yield takeEvery(fetchBooksStart, fetchBooksEffect);
  yield takeEvery(postBookStart, postBookEffect);
  yield takeEvery(editBookStart, editBookEffect);
  yield takeEvery(deleteBookStart, deleteBookEffect);
  yield takeEvery(fetchBooksWithFilterStart, fetchBooksWithFilterEffect);
}

export default booksWorkers;
