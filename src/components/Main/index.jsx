import React from "react";
import styles from "./index.module.css";
import BookInfo from "components/BookInfo";
import BookList from "components/BookList";
import { useDispatch } from "react-redux";
import { fetchBooks } from "store/slice";
import { Route, Switch } from "react-router";

const Main = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className={styles["main"]}>
      <Switch>
        <Route path="/books/?search=:filter" component={BookList} />
        <Route path="/books" component={BookList} />
      </Switch>
      <Route path="/books/:id" component={BookInfo} />
    </div>
  );
};

export default Main;
