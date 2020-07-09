import React from "react";
import styles from "./index.module.css";
import { selectBookById } from "store/selectors";
import { useSelector } from "react-redux";
import default_book from "assets/images/default_book.jpg";
import { isValidImage } from "utils";

const BookInfo = (props) => {
  const selectedBookInfo = useSelector(selectBookById);
  const { title, author, description, image } =
    selectedBookInfo !== undefined && selectedBookInfo;

  return (
    <div className={styles["book-info"]}>
      <img
        src={isValidImage(image) ? image : default_book}
        alt="book-image"
        className={styles["image"]}
      />
      <div className={styles["title"]}>{title}</div>
      <div className={styles["author"]}>{author}</div>
      <div className={styles["description"]}>{description}</div>
    </div>
  );
};

export default BookInfo;
