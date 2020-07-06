import React from "react";
import styles from "./index.module.css";
import { selectBookById } from "store/selectors";
import { useSelector } from "react-redux";

const BookInfo = () => {
  const selectedBookInfo = useSelector(selectBookById);
  // if (!Object.keys(props).length) {
  //   return (
  //     <div className={styles["info"]}>
  //       Click one of the books on the left screen to see information about it.
  //       Or you can create new by clicking the button on the left.
  //     </div>
  //   );
  // }
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
