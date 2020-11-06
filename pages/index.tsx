import React from "react";
import Chat from "../components/Chat";
import Contacts from "../components/Contacts";
import { withAuth } from "../HOCs/withAuth";
import { User } from "../interfaces/User";
import styles from "../styles/main.module.css";

const index = (user: User | null) => {
  return (
    <div className={styles.container}>
      <Contacts />
      <Chat />
    </div>
  );
};

export default withAuth(index);
