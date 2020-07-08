import React from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";
import {
  changeModalInputState,
  postBook,
  clearModalInputState,
} from "store/slice";
import { useDispatch, useSelector } from "react-redux";

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
  const handleFormSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(postBook(formState));
      props.toggleModal();
      dispatch(clearModalInputState());
    },
    [dispatch, formState]
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
          />
          <label htmlFor="title">Title</label>
          <input
            data-name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
          <label htmlFor="description">Description</label>
          <input
            data-name="description"
            type="text"
            id="description"
            onChange={handleInputChange}
          />
          <label htmlFor="image">Image</label>
          <input
            data-name="image"
            type="text"
            id="image"
            onChange={handleInputChange}
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
