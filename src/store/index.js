import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import booksReducer from "store/slice";
import { api } from "agent";

const reducers = combineReducers({
  books: booksReducer.reducer,
});

const composedEnhancers = compose(
  applyMiddleware(thunk.withExtraArgument({ api })),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducers, composedEnhancers);

export default store;
