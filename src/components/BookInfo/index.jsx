import React from "react";
import styles from "./index.module.css";
import { selectBookById } from "store/selectors";
import { useSelector, useDispatch } from "react-redux";
import default_book from "assets/images/default_book.jpg";
import { isValidImage } from "utils";
import { changeCurrentBookId } from "store/slice";

const BookInfo = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(changeCurrentBookId(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  
  const selectedBookInfo = useSelector(selectBookById);

  const isBooksLoading = useSelector((state) => state.books.isBooksLoading);
  if (isBooksLoading) {
    return <div>Loading</div>;
  }
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
