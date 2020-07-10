import React from "react";
import loader from "assets/images/loader.gif";
import styles from "./index.module.css";

const Loader = (props) => {
  return (
    <div className={styles["loader"]}>
      <img src={loader} alt="Books is loading" />
    </div>
  );
};

export default Loader;
