import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import styles from "../../styles/forwardTo.module.css";

const ForwardTo = () => {
  const [focused, setFocused] = useState<boolean>(false);
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
          <div className={`${styles.input} ${focused ? styles.focused : ""}`}>
            <div className={styles.icons}>
              <BiSearchAlt size="20px" />
              <AiOutlineArrowLeft size="20px" color="#009688" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
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
