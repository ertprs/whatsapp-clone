import styles from "../styles/contacts.module.css";
import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import {
  AddCurrentContact,
  FilterContact,
  filterContact,
  SetDisplay,
  setDisplay,
  addCurrentContact,
  fetchMessages
} from "../redux/actions";
import { User } from "../interfaces/User";
import { connect } from "react-redux";

interface Props {
  newChatRef: React.RefObject<HTMLDivElement>;
  setNewChat: React.Dispatch<React.SetStateAction<boolean>>;
  fixMT: boolean;
  setInputChange: React.Dispatch<React.SetStateAction<string | null>>;
  menuRef: React.RefObject<HTMLDivElement>;
  hideMenu: boolean;
  contacts: [] | User[] | null;
  filterContact: (text: string) => FilterContact;
  addCurrentContact: (user: User) => AddCurrentContact;
  fetchMessages: Function;
  setDisplay: (display: boolean) => SetDisplay;
}

const NewChat: React.FC<Props> = props => {
  return (
    <div className={`${styles.newChat}`} ref={props.newChatRef}>
      <div
        className={`${styles.profile} ${styles.fixed} ${styles.profile_contacts}`}
      >
        <div onClick={() => props.setNewChat(false)}>
          <HiOutlineArrowLeft size="30px" />
        </div>
        <p>New Chat</p>
        <div
          className={` ${props.fixMT && styles.fix_mt} ${styles.fixed_input_2}`}
        >
          <input
            type="text"
            className={`${styles.input_2}`}
            placeholder="Search Contact"
            onChange={e => {
              props.setInputChange(e.target.value);

              props.filterContact(e.target.value);
            }}
          />
          <BiSearchAlt className={`${styles.BiSearchAlt_2} `} />
        </div>
      </div>
      <div className={`${styles.profile}`}>
        <div
          ref={props.menuRef}
          className={`${styles.box} ${props.hideMenu && styles.hideMenu}`}
        ></div>
      </div>
      {props.contacts &&
        props.contacts?.length !== 0 &&
        props.contacts.map(user => (
          <div
            className={styles.profile}
            key={user._id}
            onClick={() => {
              props.setNewChat(false);
              props.addCurrentContact(user);
              props.fetchMessages(user._id);
              props.setDisplay(false);
            }}
          >
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.user}>
              <div className={styles.user_header}>
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
                <p>{new Date(user.createdAt).toLocaleDateString()} </p>
              </div>
              <p>{user.status}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default connect(null, {
  fetchMessages,
  setDisplay,
  addCurrentContact,
  filterContact
})(NewChat);
