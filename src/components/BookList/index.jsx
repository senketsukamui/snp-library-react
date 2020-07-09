import React from "react";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import BookListItem from "components/BookList/BookListItem";
import Scrollbars from "react-custom-scrollbars";
import ModalForm from "components/ModalForm";
import { MODAL_TYPES } from "utils/constants";
import { changeCurrentFilterString, fetchTodosWithFilter } from "store/slice";
import queryString from "query-string";
import { useHistory } from "react-router";

const BookList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setModalOpen] = React.useState(false);

  const [currentFilter, changeCurrentFilter] = React.useState(
    queryString.parse(props.location.search).search
  );
  const toggleModal = React.useCallback(() => setModalOpen(!isModalOpen), [
    isModalOpen,
  ]);

  const handleInputChange = React.useCallback(
    (e) => {
      changeCurrentFilter(e.target.value);
    },
    [dispatch]
  );

  const handleFormSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(fetchTodosWithFilter(currentFilter));
      if (!currentFilter.length) {
        history.push("/books");
      } else {
        history.push(`/books/?search=${currentFilter}`);
      }
    },
    [dispatch, currentFilter]
  );

  const books = useSelector((state) => state.books.booksList);

  const renderedBooks = books.map((e) => {
    return <BookListItem {...e} key={e.id} />;
  });

  return (
    <div className={styles["booklist"]}>
      {isModalOpen ? (
        <ModalForm toggleModal={toggleModal} type={MODAL_TYPES.CREATE} />
      ) : (
        ""
      )}
      <Scrollbars>
        <form onSubmit={handleFormSubmit} onBlur={handleFormSubmit}>
          <input type="text" onChange={handleInputChange} />
          <button type="submit">Search</button>
        </form>
        <button onClick={toggleModal}>Open modal</button>
        <div className={styles["booklist-items"]}>{renderedBooks}</div>
      </Scrollbars>
    </div>
  );
};

export default BookList;
