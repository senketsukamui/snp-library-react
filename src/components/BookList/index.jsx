import React from "react";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import BookListItem from "components/BookList/BookListItem";
import Scrollbars from "react-custom-scrollbars";
import ModalForm from "components/ModalForm";
import { MODAL_TYPES } from "utils/constants";
import { actions } from "models/booksList/slice";
import queryString from "query-string";
import { useHistory } from "react-router";
import { bookListSelector } from "models/booksList/selectors";

const { fetchBooksWithFilterStart, fetchBooksStart } = actions;

const BookList = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [isModalOpen, setModalOpen] = React.useState(false);

  const [currentFilter, changeCurrentFilter] = React.useState("");

  React.useEffect(() => {
    const queryStringFilter = queryString.parse(props.location.search).search;
    if (queryStringFilter) {
      changeCurrentFilter(queryStringFilter);
      dispatch(fetchBooksWithFilterStart(queryStringFilter));
    } else {
      dispatch(fetchBooksStart());
    }
  }, [dispatch, props.location.search]);

  const books = useSelector(bookListSelector);
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
      dispatch(fetchBooksWithFilterStart(currentFilter));
      if (!currentFilter.length) {
        history.push("/books");
      } else {
        history.push(`/books/?search=${currentFilter}`);
      }
    },
    [dispatch, currentFilter, history]
  );

  const renderedBooks = React.useMemo(
    () => books.map((book) => <BookListItem {...book} key={book.id} />),
    [books]
  );

  return (
    <div className={styles["booklist"]}>
      {isModalOpen ? (
        <ModalForm
          type={MODAL_TYPES.CREATE}
          onToggleModal={handleToggleModal}
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
            value={currentFilter}
            className={styles["booklist-input"]}
            onChange={handleInputChange}
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
