import React from "react";
import styles from "./index.module.css";
import { getShortString, isValidImage } from "utils";
import { useDispatch } from "react-redux";
import { changeCurrentBookId } from "store/slice";
import { useHistory } from "react-router-dom";
import default_book from "assets/images/default_book.jpg";

const BookListItem = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleItemClick = React.useCallback(() => {
    dispatch(changeCurrentBookId(props.id));
    history.push(`/books/${props.id}`);
  }, [dispatch.history, props.id]);

  return (
    <div className={styles["booklist-item"]} onClick={handleItemClick}>
      <div className={styles["image"]}>
        <img
          src={isValidImage(props.image) ? props.image : default_book}
          alt="Book image"
          className={styles["book-logo"]}
        />
      </div>
      <div className={styles["information"]}>
        <div className={styles["title"]}>{props.title}</div>
        <div className={styles["author"]}>{props.author}</div>
        <div className={styles["description"]}>
          {getShortString(props.description)}
        </div>
      </div>
      <button>Delete</button>
    </div>
  );
};

export default BookListItem;
