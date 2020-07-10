import React from "react";
import styles from "./index.module.css";
import { selectBookById } from "store/selectors";
import { useSelector, useDispatch } from "react-redux";
import default_book from "assets/images/default_book.jpg";
import { isValidImage } from "utils";
import { changeCurrentBookId } from "store/slice";
import Loader from "components/Loader";
import { useHistory } from "react-router";

const BookInfo = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(changeCurrentBookId(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const selectedBookInfo = useSelector(selectBookById);
  const isBooksLoading = useSelector((state) => state.books.isBooksLoading);
  if (isBooksLoading) {
    return <Loader />;
  }
  const { title, author, description, image } =
    selectedBookInfo !== undefined && selectedBookInfo;

  const handleCloseClick = () => {
    history.push("/books");
  };
  if (selectedBookInfo === undefined) {
    return <div className={styles["error"]}>There is no book with that id. Try to choose another or create a new one.</div>;
  }
  return (
    <div className={styles["book-info"]}>
      <div className={styles["information"]}>
        <img
          src={isValidImage(image) ? image : default_book}
          alt="book-image"
          className={styles["image"]}
        />
        <div className={styles["title"]}>{title}</div>
        <div className={styles["author"]}>{author}</div>
        <div className={styles["description"]}>{description}</div>
      </div>
      <div className={styles["footer"]}>
        <button className={styles["close"]} onClick={handleCloseClick}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BookInfo;
