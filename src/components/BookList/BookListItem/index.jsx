import React from "react";
import styles from "./index.module.css";
import { getShortString, isValidImage } from "utils";
import { useDispatch } from "react-redux";
import {
  changeCurrentBookId,
  deleteBook,
  setModalInputState,
} from "store/slice";
import { useHistory } from "react-router-dom";
import default_book from "assets/images/default_book.jpg";
import ModalForm from "components/ModalForm";
import { MODAL_TYPES } from "utils/constants";
import edit from "assets/images/edit.svg";
import trash from "assets/images/trash.svg";

const BookListItem = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [isEditModalOpen, setEditModalState] = React.useState(false);

  const handleItemClick = React.useCallback(() => {
    dispatch(changeCurrentBookId(props.id));
    history.push(`/books/${props.id}`);
  }, [dispatch, history, props.id]);

  const handleItemDelete = React.useCallback(() => {
    dispatch(deleteBook(props.id));
    history.push("/books");
  }, [dispatch, history, props.id]);

  const handleItemEdit = React.useCallback(() => {
    const { author, title, description, image, id } = props;
    dispatch(
      setModalInputState({
        author: author,
        title: title,
        description: description,
        image: image,
        id: id,
      })
    );
    setEditModalState(true);
  }, [dispatch, props]);

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
          <div className={styles["title"]}>
            {getShortString(30, props.title)}
          </div>
          <div className={styles["author"]}>
            {getShortString(25, props.author)}
          </div>
          <div className={styles["description"]}>
            {getShortString(40, props.description)}
          </div>
        </div>
      </div>
      <div className={styles["buttons"]}>
        <button onClick={handleItemEdit} className={styles["edit-button"]}>
          <img src={edit} alt="Edit button" className={styles["edit-icon"]} />
        </button>

        <button onClick={handleItemDelete} className={styles["delete-button"]}>
          <img
            src={trash}
            alt="Delete button"
            className={styles["delete-icon"]}
          />
        </button>
      </div>
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

export default React.memo(BookListItem);
