import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "../../styles/groupSubject.module.css";

const GroupSubject = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <AiOutlineArrowLeft />
        </div>
        <div>New Group</div>
      </div>
      <div className={styles.group_pfp}>
        <img src="blank-profile-picture-973460_640.png" alt="grp_img" />
      </div>
      <div className={styles.input}>
        <input type="text" />
      </div>
    </div>
  );
};

export default GroupSubject;
