import { createSelector } from "reselect";

export const selectBookById = createSelector(
  (state) => ({ id: state.books.currentBookId, array: state.books.booksList }),
  ({ id, array }) => array.find((e) => e.id === Number(id))
);
