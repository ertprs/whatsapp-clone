import React from "react";
import { BsCheck } from "react-icons/bs";
import styles from "../../styles/groupSearch.module.css";

const GroupSearch = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>X</p>
          <p>Search Messages</p>
          <input type="text" />
        </div>
        <div className={styles.body}>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupSearch;
