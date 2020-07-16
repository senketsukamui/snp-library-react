import React from "react";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import BookListItem from "components/BookList/BookListItem";
import Scrollbars from "react-custom-scrollbars";
import ModalForm from "components/ModalForm";
import { MODAL_TYPES } from "utils/constants";
import { fetchTodosWithFilter, fetchBooks } from "models/booksList/slice";
import queryString from "query-string";
import { useHistory } from "react-router";

const BookList = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [isModalOpen, setModalOpen] = React.useState(false);

  const [currentFilter, changeCurrentFilter] = React.useState("");

  React.useEffect(() => {
    const queryStringFilter = queryString.parse(props.location.search).search;
    if (queryStringFilter) {
      changeCurrentFilter(queryStringFilter);
      dispatch(fetchTodosWithFilter(queryStringFilter));
    } else {
      dispatch(fetchBooks());
    }
  }, [dispatch, props.location.search]);

  const books = useSelector((state) => state.books.booksList);

  const handleToggleModal = React.useCallback(
    () => setModalOpen(!isModalOpen),
    [isModalOpen]
  );

  const handleInputChange = React.useCallback((e) => {
    changeCurrentFilter(e.target.value);
  }, []);

  const handleFormSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(fetchTodosWithFilter(currentFilter));
      if (!currentFilter.length || currentFilter === undefined) {
        history.push("/books");
      } else {
        history.push(`/books/?search=${currentFilter}`);
      }
    },
    [dispatch, currentFilter, history]
  );

  const renderedBooks = books.map((e) => {
    return <BookListItem {...e} key={e.id} />;
  });

  return (
    <div className={styles["booklist"]}>
      {isModalOpen ? (
        <ModalForm
          onToggleModal={handleToggleModal}
          type={MODAL_TYPES.CREATE}
        />
      ) : (
        ""
      )}
      <Scrollbars>
        <button
          className={styles["booklist-create"]}
          onClick={handleToggleModal}
        >
          Create new book
        </button>
        <form onSubmit={handleFormSubmit} onBlur={handleFormSubmit}>
          <input
            type="text"
            onChange={handleInputChange}
            value={currentFilter}
            className={styles["booklist-input"]}
          />
          <button className={styles["booklist-search"]} type="submit">
            Search
          </button>
        </form>

        <div className={styles["booklist-items"]}>{renderedBooks}</div>
      </Scrollbars>
    </div>
  );
};

export default React.memo(BookList);
