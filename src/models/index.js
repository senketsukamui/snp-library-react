import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import booksReducer from "models/booksList/slice";
import modalReducer from "models/modal/slice";
import booksWorkers from "./booksList/sagas";
import { all } from "redux-saga/effects";

const reducers = combineReducers({
  books: booksReducer.reducer,
  modal: modalReducer.reducer,
});

function* rootSaga() {
  yield all([booksWorkers()]);
}

const sagaMiddleware = createSagaMiddleware();

const composedEnhancers = compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducers, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
