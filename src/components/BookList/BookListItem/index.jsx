import React from "react";
import styles from "./index.module.css";
import { getShortString } from "utils";
import { useDispatch } from "react-redux";
import { changeCurrentBookId } from "store/slice";

const BookListItem = (props) => {
  const dispatch = useDispatch();

  const handleItemClick = React.useCallback(() => {
    dispatch(changeCurrentBookId(props.id));
  }, [dispatch]);

  return (
    <div className={styles["booklist-item"]} onClick={handleItemClick}>
      <div className={styles["image"]}>
        <img
          src={props.image}
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
    </div>
  );
};

export default BookListItem;
