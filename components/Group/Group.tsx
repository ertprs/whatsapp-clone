import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "../../styles/group.module.css";

const Group = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <AiOutlineArrowLeft size="20px" />
          <p>Header</p>
        </div>
        <input type="text" />
      </div>
      <div className={styles.body}>
        <div className={styles.group}>
          <img src="portitem1.jpeg" alt="pfp" />
          <div className={styles.text_body}>
            <div className={styles.metadata}>
              <h2>Kevin</h2>
              <p>3 days ago</p>
            </div>
            <div>Lorem ipsum dolor sit</div>
          </div>
        </div>
        <div className={styles.group}>
          <img src="portitem1.jpeg" alt="pfp" />
          <div className={styles.text_body}>
            <div className={styles.metadata}>
              <h2>Kevin</h2>
              <p>3 days ago</p>
            </div>
            <div>Lorem ipsum dolor sit</div>
          </div>
        </div>
        <div className={styles.group}>
          <img src="portitem1.jpeg" alt="pfp" />
          <div className={styles.text_body}>
            <div className={styles.metadata}>
              <h2>Kevin</h2>
              <p>3 days ago</p>
            </div>
            <div>Lorem ipsum dolor sit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
