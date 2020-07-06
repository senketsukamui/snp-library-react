import React from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import BookListItem from "components/BookList/BookListItem";

const BookList = () => {
  const books = useSelector((state) => state.books.booksList);
  const renderedBooks = books.map((e) => {
    return <BookListItem {...e} />;
  });
  return <div className={styles["booklist"]}>{renderedBooks}</div>;
};

export default BookList;
