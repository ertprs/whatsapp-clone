import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "../../styles/groupSubject.module.css";

const GroupSubject = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <AiOutlineArrowLeft size="20px" />
        </div>
        <div>
          <p>New Group</p>
        </div>
      </div>
      <div className={styles.group_pfp}>
        <img src="blank-profile-picture-973460_640.png" alt="grp_img" />
      </div>
      <div className={styles.input}>
        <input type="text" />
        <div>
          <p>Group Subject</p>
        </div>
        <span>&nbsp;</span>
      </div>
    </div>
  );
};

export default GroupSubject;
