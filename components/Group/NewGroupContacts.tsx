import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import styles from "../../styles/NewGroupContacts.module.css";

const NewGroupContacts = () => {
  const contacts = useSelector((state: Redux) => state.user.contacts);
  return (
    <div className={styles.container}>
      <div>
        <div>
          <AiOutlineArrowLeft />
        </div>
        <p>Add Group Participants</p>
      </div>
      <div className={styles.input}>
        <input type="text" placeholder="Type contact name" />
        <span className={styles.input_border}>&nbsp;</span>
      </div>
      <div>
        {contacts &&
          contacts.length !== 0 &&
          (contacts as User[]).map(user => (
            <div className={styles.contacts}>
              <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
              <div className={styles.user}>
                <div className={styles.user_header}>
                  <h2>
                    {user.firstName} {user.lastName}
                  </h2>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewGroupContacts;
