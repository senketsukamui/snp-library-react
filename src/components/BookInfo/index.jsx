import React from "react";
import styles from "./index.module.css";
import {
  selectBookById,
  isBooksLoadingSelector,
} from "models/booksList/selectors";
import { useSelector, useDispatch } from "react-redux";
import default_book from "assets/images/default_book.jpg";
import { isValidImage } from "utils";
import { changeCurrentBookId } from "models/booksList/slice";
import Loader from "components/Loader";
import { useHistory } from "react-router";

const BookInfo = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  React.useEffect(() => {
    dispatch(changeCurrentBookId(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const selectedBookInfo = useSelector(selectBookById);

  const isBooksLoading = useSelector(isBooksLoadingSelector);

  if (isBooksLoading) {
    return <Loader />;
  }

  if (!selectedBookInfo) {
    return (
      <div className={styles["error"]}>
        There is no book with that id. Try to choose another or create a new
        one.
      </div>
    );
  }

  const { title, author, description, image } = selectedBookInfo;

  const handleCloseClick = () => {
    history.push("/books");
  };

  return (
    <div className={styles["book-info"]}>
      <div className={styles["information"]}>
        <img
          src={isValidImage(image) ? image : default_book}
          alt="Book cover"
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

export default React.memo(BookInfo);
