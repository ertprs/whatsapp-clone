import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import styles from "../../styles/groupSubject.module.css";

const GroupSubject = () => {
  const [input, setInput] = useState<string>("");
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
      <div
        className={`${styles.input}  ${
          input.trim().length !== 0 ? styles.checkmark__show : ""
        }`}
      >
        <input
          type="text"
          onChange={e => setInput(e.target.value)}
          value={input}
        />
        <div
          className={
            input.length !== 0 ? styles.transform__up : styles.transform
          }
        >
          <p>Group Subject</p>
        </div>
        <span>&nbsp;</span>
        <div className={styles.checkmark}>
          <IoMdCheckmark size="30px" />
        </div>
      </div>
    </div>
  );
};

export default GroupSubject;
