import React from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";
import {
  changeModalInputState,
  postBook,
  clearModalInputState,
  editBookInfo,
} from "store/slice";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPES } from "utils/constants";

const ModalForm = (props) => {
  const dispatch = useDispatch();

  const handleInputChange = React.useCallback(
    (e) => {
      dispatch(
        changeModalInputState({
          field: e.target.dataset.name,
          value: e.target.value,
        })
      );
    },
    [dispatch]
  );

  const formState = useSelector((state) => state.books.modalInputState);

  const { author, title, description, image } = formState;
  
  const handleFormSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (props.type === MODAL_TYPES.CREATE) {
        dispatch(postBook(formState));
      } else if (props.type === MODAL_TYPES.EDIT) {
        dispatch(editBookInfo(formState));
      }
      props.toggleModal();
      dispatch(clearModalInputState());
    },
    [dispatch, formState, props]
  );

  return createPortal(
    <div className={styles["modal-wrapper"]}>
      <div className={styles["modal"]}>
        <div className={styles["modal-title"]}>{props.modalTitle}</div>
        <form className={styles["modal-form"]} onSubmit={handleFormSubmit}>
          <label htmlFor="author">Author</label>
          <input
            data-name="author"
            type="text"
            id="author"
            onChange={handleInputChange}
            value={author}
            maxLength={100}
            required
          />
          <label htmlFor="title">Title</label>
          <input
            data-name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={title}
            maxLength={150}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            data-name="description"
            type="text"
            id="description"
            onChange={handleInputChange}
            value={description}
            maxLength={1350}
            required
          />
          <label htmlFor="image">Image</label>
          <input
            data-name="image"
            type="text"
            id="image"
            onChange={handleInputChange}
            value={image}
          />
          <button type="submit" className={styles["modal-submit"]}>
            Submit
          </button>
          <button onClick={props.toggleModal} className={styles["modal-close"]}>
            Close
          </button>
        </form>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default React.memo(ModalForm);
