import React from "react";
import styles from "./index.module.css";
import { getShortString, isValidImage } from "utils";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentBookId,
  deleteBook,
  setModalInputState,
} from "store/slice";
import { useHistory } from "react-router-dom";
import default_book from "assets/images/default_book.jpg";
import ModalForm from "components/ModalForm";
import { MODAL_TYPES } from "utils/constants";

const BookListItem = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isEditModalOpen, setEditModalState] = React.useState(false);

  const handleItemClick = React.useCallback(() => {
    dispatch(changeCurrentBookId(props.id));
    history.push(`/books/${props.id}`);
  }, [dispatch.history, props.id]);

  const handleItemDelete = React.useCallback(() => {
    dispatch(deleteBook(props.id));
    history.push("/books");
  }, [dispatch, props.id]);

  const handleItemEdit = React.useCallback(() => {
    dispatch(
      setModalInputState({
        author: props.author,
        title: props.title,
        description: props.description,
        image: props.image,
        id: props.id,
      })
    );
    setEditModalState(true);
  });
  const toggleEditModal = React.useCallback(() => {
    setEditModalState(!isEditModalOpen);
  }, [isEditModalOpen]);
  return (
    <div className={styles["booklist-item"]}>
      <div className={styles["booklist-content"]} onClick={handleItemClick}>
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
      </div>
      <button onClick={handleItemEdit}>Edit</button>
      <button onClick={handleItemDelete}>Delete</button>
      {isEditModalOpen ? (
        <ModalForm
          type={MODAL_TYPES.EDIT}
          toggleModal={toggleEditModal}
          {...props}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default BookListItem;
