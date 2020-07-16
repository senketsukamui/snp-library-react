import React from "react";
import styles from "./index.module.css";
import BookInfo from "components/BookInfo";
import BookList from "components/BookList";
import { Route, Switch } from "react-router";
import { useSelector } from "react-redux";
import { errorSelector } from "models/booksList/selectors";

const Main = () => {
  const isError = useSelector(errorSelector);

  if (isError) {
    return (
      <div className={styles["main"]}>
        <div className={styles["error"]}>
          Something went wrong. Please reload the page or try again later.
        </div>
      </div>
    );
  }

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

export default React.memo(Main);
