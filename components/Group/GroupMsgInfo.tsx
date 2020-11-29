import React from "react";
import { useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import styles from "../../styles/groupMessageInfo.module.css";

const GroupMsgInfo = () => {
  const groupMessageInfo = useSelector(
    (state: Redux) => state.group.groupMessageInfo
  );
  return (
    <div className={groupMessageInfo ? styles.groupMessageInfo : ""}>
      <div className={styles.container}>GroupMsgInfo GroupMsgInfo</div>;
    </div>
  );
};

export default GroupMsgInfo;
