import React from "react";
import { BsCheckAll } from "react-icons/bs";
import styles from "../styles/messageInfo.module.css";

const MessageInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        porro eveniet nobis fugiat quasi neque sequi consequuntur, voluptas id
        dignissimos, deleniti accusamus magnam autem repellendus quos eius sed
        nemo cum?
      </div>
      <div className={styles.message_info}>
        <div>
          <p>
            <span>
              <BsCheckAll
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="#4fc3f7"
              />
            </span>
            <span>Read</span>
          </p>
          <p>7:30pm</p>
        </div>
        <div>
          <p>
            <span>
              <BsCheckAll
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgb(80,80,80)"
              />
            </span>
            <span>Delivered</span>
          </p>
          <p>7:30pm</p>
        </div>
      </div>
    </div>
  );
};

export default MessageInfo;
