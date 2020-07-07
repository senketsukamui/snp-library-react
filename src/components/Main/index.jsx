import React from "react";
import styles from "./index.module.css";
import BookInfo from "components/BookInfo";
import BookList from "components/BookList";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "store/slice";
import { Route, Switch } from "react-router";

const Main = () => {
  const dispatch = useDispatch();
  const currentDisplayBook = useSelector((state) => state.books.currentBookId);
  React.useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <div className={styles["main"]}>
      <Switch>
        <Route exact path="/books" component={BookList} />
        <Route path="/books/:id" component={BookInfo} />
      </Switch>
    </div>
  );
};

export default Main;
