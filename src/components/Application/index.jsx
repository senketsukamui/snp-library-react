import React from "react";
import styles from "./index.module.css";
import Main from "components/Main";
import { Provider } from "react-redux";
import store from "store";

function App() {
  return (
    <div className={styles["wrapper"]}>
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
