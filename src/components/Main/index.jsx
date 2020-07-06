import React from "react";
import styles from "./index.module.css";
import BookInfo from "components/BookInfo";
import BookList from "components/BookList";

const Main = () => {
  return (
    <div className={styles["main"]}>
      <BookList />
      <BookInfo />
    </div>
  );
};

export default Main;
