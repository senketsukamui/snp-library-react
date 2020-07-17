import React from "react";
import styles from "./index.module.css";
import Main from "components/Main";
import { Provider } from "react-redux";
import store from "models";
import { BrowserRouter, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className={styles["wrapper"]}>
        <Provider store={store}>
          <Main />
          <Redirect to="/books" />
        </Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
