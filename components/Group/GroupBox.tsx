import React from "react";
import styles from "../../styles/groupChat.module.css";

const GroupBox = () => {
  return (
    <div className={styles.box}>
      <p>Group Info</p>
      <p>Select Messages</p>
      <p>Mute Notifications</p>
      <p>Exit Group</p>
    </div>
  );
};

export default GroupBox;
