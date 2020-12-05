import React from "react";
import styles from "../../styles/forwardTo.module.css";

const ForwardTo = () => {
  return (
    <div className={styles.outer_container}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p>X</p>
            <p>Forward message to</p>
          </div>
          <input type="text" />
        </div>
        <div className={styles.body}>
          <p>CHATS</p>
          <div className={styles.contacts}>
            <div className={styles.contact}>
              <input type="checkbox" name="" id="" />
              <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
              <p>Kelvin Mitaki</p>
            </div>
            <div className={styles.contact}>
              <input type="checkbox" name="" id="" />
              <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
              <p>Kelvin Mitaki</p>
            </div>
            <div className={styles.contact}>
              <input type="checkbox" name="" id="" />
              <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
              <p>Kelvin Mitaki</p>
            </div>
            <div className={styles.contact}>
              <input type="checkbox" name="" id="" />
              <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
              <p>Kelvin Mitaki</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForwardTo;
