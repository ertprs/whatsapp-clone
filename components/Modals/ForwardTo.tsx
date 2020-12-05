import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import styles from "../../styles/forwardTo.module.css";

const ForwardTo = () => {
  return (
    <div className={styles.outer_container}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_info}>
            <span>
              <p className={styles.cancel}>&nbsp;</p>
            </span>
            <p>Forward message to</p>
          </div>
          <div className={styles.input}>
            <div className={styles.BiSearchAlt}>
              <BiSearchAlt />
            </div>
            <input type="text" placeholder="Search..." />
          </div>
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
