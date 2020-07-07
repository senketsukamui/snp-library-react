import React from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import BookListItem from "components/BookList/BookListItem";
import Scrollbars from "react-custom-scrollbars";

const BookList = () => {
  const books = useSelector((state) => state.books.booksList);
  const renderedBooks = books.map((e) => {
    return <BookListItem {...e} key={e.id} />;
  });
  return (
    <Scrollbars style={{ height: 800 }}>
      <div className={styles["booklist"]}>{renderedBooks}</div>
    </Scrollbars>
  );
};

export default BookList;
