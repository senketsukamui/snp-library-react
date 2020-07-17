import React from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";
import {
  changeModalInputState,
  clearModalInputState,
} from "models/modal/slice";
import { actions } from "models/booksList/slice";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPES } from "utils/constants";
import { modalFieldsSelector } from "models/modal/selectors";

const { postBookStart, editBookStart } = actions;

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

  const formState = useSelector(modalFieldsSelector);

  const { author, title, description, image } = formState;

  const handleFormSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (props.type === MODAL_TYPES.CREATE) {
        dispatch(postBookStart(formState));
      } else if (props.type === MODAL_TYPES.EDIT) {
        dispatch(editBookStart(formState));
      }
      props.onToggleModal();
      dispatch(clearModalInputState());
    },
    [dispatch, formState, props]
  );

  const toggleEditModal = React.useCallback(() => {
    props.onToggleModal();
    dispatch(clearModalInputState());
  }, [dispatch, props]);

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
            value={author}
            maxLength={100}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="title">Title</label>
          <input
            data-name="title"
            type="text"
            id="title"
            value={title}
            maxLength={150}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            data-name="description"
            type="text"
            id="description"
            value={description}
            maxLength={1350}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="image">Image</label>
          <input
            data-name="image"
            type="text"
            id="image"
            value={image}
            onChange={handleInputChange}
          />
          <button type="submit" className={styles["modal-submit"]}>
            Submit
          </button>
          <button
            onClick={
              props.type === MODAL_TYPES.EDIT
                ? toggleEditModal
                : props.onToggleModal
            }
            className={styles["modal-close"]}
          >
            Close
          </button>
        </form>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default React.memo(ModalForm);
