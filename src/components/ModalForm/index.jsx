import React from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";

const ModalForm = (props) => {
  return createPortal(
    <div className={styles["modal-wrapper"]}>
      <div className={styles["modal"]}>
        <div className={styles["modal-title"]}>{props.modalTitle}</div>
        <form className={styles["modal-form"]}>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" />
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" />
          <label htmlFor="image">Image</label>
          <input type="text" id="image" />
          <button type="submit">Submit</button>
          <button
            onClick={props.toggleModal}
            className={styles["modal-submit"]}
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
