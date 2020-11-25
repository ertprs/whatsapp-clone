import React from "react";
import styles from "../../styles/groupChat.module.css";

const GroupBox = () => {
  return (
    <div className={styles.box}>
      <div>
        <p>Group Info</p>
      </div>
      <div>
        <p>Select Messages</p>
      </div>
      <div>
        <p>Mute Notifications</p>
      </div>
      <div>
        <p>Exit Group</p>
      </div>
    </div>
  );
};

export default GroupBox;
