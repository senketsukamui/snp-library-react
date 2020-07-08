import React from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import BookListItem from "components/BookList/BookListItem";
import Scrollbars from "react-custom-scrollbars";
import ModalForm from "components/ModalForm";

const BookList = () => {
  const books = useSelector((state) => state.books.booksList);
  const renderedBooks = books.map((e) => {
    return <BookListItem {...e} key={e.id} />;
  });
  const [isModalOpen, setModalOpen] = React.useState(false);

  const toggleModal = React.useCallback(() => setModalOpen(!isModalOpen), [
    isModalOpen,
  ]);
  return (
    <div className={styles["booklist"]}>
      {isModalOpen ? <ModalForm toggleModal={toggleModal} /> : ""}
      <Scrollbars>
        <button onClick={toggleModal}>Open modal</button>
        <div className={styles["booklist-items"]}>{renderedBooks}</div>
      </Scrollbars>
    </div>
  );
};

export default BookList;
