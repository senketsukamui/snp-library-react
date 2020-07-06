import React from "react";
import styles from "./index.module.css";
import BookInfo from "components/BookInfo";
import BookList from "components/BookList";
import { useDispatch } from "react-redux";
import { fetchBooks } from "store/slice";

const Main = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <div className={styles["main"]}>
      <BookList />
      <BookInfo />
    </div>
  );
};

export default Main;
