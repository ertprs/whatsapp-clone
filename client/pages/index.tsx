import React from "react";
import Chat from "../components/Chat";
import Contacts from "../components/Contacts";
import styles from "../styles/main.module.css";

const index = () => {
  return (
    <div className={styles.container}>
      <Contacts />
      <Chat />
    </div>
  );
};

export default index;
