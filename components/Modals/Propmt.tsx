import React from "react";
import styles from "../../styles/prompt.module.css";

const Propmt = () => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <p>Delete chat with "kevin" ?</p>
        <div>
          <button>cancel</button>
          <button>delete</button>
        </div>
      </div>
    </div>
  );
};

export default Propmt;
