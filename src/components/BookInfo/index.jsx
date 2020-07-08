import React from "react";
import styles from "./index.module.css";
import { selectBookById } from "store/selectors";
import { useSelector } from "react-redux";

const BookInfo = () => {
  const selectedBookInfo = useSelector(selectBookById);

  const { title, author, description, image } =
    selectedBookInfo !== undefined && selectedBookInfo;

  return (
    <div className={styles["book-info"]}>
      <div className={styles["title"]}>{title}</div>
      <div className={styles["author"]}>{author}</div>
      <div className={styles["description"]}>{description}</div>
    </div>
  );
};

export default BookInfo;