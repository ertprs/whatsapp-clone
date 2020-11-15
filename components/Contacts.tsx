import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/contacts.module.css";
import { MdMessage } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { connect, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import {
  AddCurrentContact,
  addCurrentContact,
  fetchMessages,
  setDisplay,
  SetDisplay
} from "../redux/actions";
import { User } from "../interfaces/User";
import { Message } from "../interfaces/Message";
import formatDistance from "date-fns/formatDistance";
import NewChat from "./NewChat";
import Header from "./Header";
import Box from "./Box";

interface Props {
  addCurrentContact: (user: User) => AddCurrentContact;
  fetchMessages: Function;
  setDisplay: (display: boolean) => SetDisplay;
}

const Main: React.FC<Props> = props => {
  const [hideIcon, setHideIcon] = useState<boolean>(false);
  const [hideMenu, setHideMenu] = useState<boolean>(true);
  const [newChat, setNewChat] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const [fixMT, setFixMT] = useState<boolean>(false);
  const [inputChange, setInputChange] = useState<string | null>(null);
  const contacts = useSelector<Redux>(
    state => state.user.filteredContacts
  ) as Redux["user"]["contacts"];
  const currentUser = useSelector<Redux>(
    state => state.user.currentUser
  ) as Redux["user"]["currentUser"];
  const filteredRecentChats = useSelector<Redux>(
    state => state.message.filteredRecentChats
  ) as Redux["message"]["filteredRecentChats"];
  const messages = useSelector<Redux>(
    state => state.message.messages
  ) as Redux["message"]["messages"];
  const menuRef = useRef<HTMLDivElement>(null);
  const newChatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (
      newChatRef.current &&
      newChatRef.current.offsetHeight < newChatRef.current.scrollHeight
    ) {
      setFixMT(false);
    } else {
      setFixMT(true);
    }
  }, [inputChange]);
  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (menuRef && menuRef.current && !menuRef.current?.contains(e.target)) {
      setHideMenu(true);
    }
  };
  return (
    <div className={`${styles.container} ${newChat && styles.newChat_show}`}>
      <NewChat
        contacts={contacts}
        fixMT={fixMT}
        hideMenu={hideMenu}
        menuRef={menuRef}
        newChatRef={newChatRef}
        setInputChange={setInputChange}
        setNewChat={setNewChat}
      />
      <Header
        setHideIcon={setHideIcon}
        hideIcon={hideIcon}
        hideMenu={hideMenu}
        setHideMenu={setHideMenu}
        setNewChat={setNewChat}
      />
      <Box hideMenu={hideMenu} menuRef={menuRef} />
      {filteredRecentChats &&
        filteredRecentChats.length !== 0 &&
        (filteredRecentChats as Message[]).map(msg => (
          <div
            className={styles.profile}
            key={msg._id}
            onClick={() => {
              if (currentUser?._id.toString() === msg.to._id.toString()) {
                props.addCurrentContact(msg.from);
                props.fetchMessages(msg.from._id);
              } else {
                props.addCurrentContact(msg.to);
                props.fetchMessages(msg.to._id);
              }
              props.setDisplay(false);
            }}
          >
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.user}>
              <div className={styles.user_header}>
                <h2>
                  {currentUser?._id.toString() === msg.to._id.toString()
                    ? `${msg.from.firstName} ${msg.from.lastName}`
                    : `${msg.to.firstName} ${msg.to.lastName}`}
                </h2>
                <p>
                  {messages && messages.length !== 0
                    ? formatDistance(
                        new Date(
                          messages![messages!.length - 1].createdAt as string
                        ),
                        Date.now()
                      )
                    : formatDistance(
                        new Date(msg.updatedAt as string),
                        Date.now()
                      )}
                </p>
              </div>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default connect(null, {
  addCurrentContact,

  setDisplay,
  fetchMessages
})(Main);
