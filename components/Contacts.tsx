import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/contacts.module.css";
import { MdMessage } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { connect, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import { HiOutlineArrowLeft } from "react-icons/hi";
import {
  AddCurrentContact,
  addCurrentContact,
  FilterContact,
  filterContact,
  fetchMessages,
  filterRecentChats,
  FilterRecentChats
} from "../redux/actions";
import { User } from "../interfaces/User";
import { Message } from "../interfaces/Message";
import formatDistance from "date-fns/formatDistance";

interface Props {
  filterContact: (text: string) => FilterContact;
  addCurrentContact: (user: User) => AddCurrentContact;
  fetchMessages: Function;
  filterRecentChats: (text: string) => FilterRecentChats;
}

const Main: React.FC<Props> = props => {
  const [hideIcon, setHideIcon] = useState<boolean>(false);
  const [hideMenu, setHideMenu] = useState<boolean>(true);
  const [newChat, setNewChat] = useState<boolean>(false);
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
  const menuRef = useRef<HTMLDivElement>(null);
  const newChatRef = useRef<HTMLDivElement>(null);
  const scrollToTop = useRef(null);
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
      <div className={`${styles.newChat}`} ref={newChatRef}>
        <div
          className={`${styles.profile} ${styles.fixed} ${styles.profile_contacts}`}
        >
          <div onClick={() => setNewChat(false)}>
            <HiOutlineArrowLeft size="30px" />
          </div>
          <p>New Chat</p>
          <div className={` ${fixMT && styles.fix_mt} ${styles.fixed_input_2}`}>
            <input
              type="text"
              className={`${styles.input_2}`}
              placeholder="Search Contact"
              onChange={e => {
                setInputChange(e.target.value);

                props.filterContact(e.target.value);
              }}
            />
            <BiSearchAlt className={`${styles.BiSearchAlt_2} `} />
          </div>
        </div>
        <div className={`${styles.profile}`}>
          <div
            ref={menuRef}
            className={`${styles.box} ${hideMenu && styles.hideMenu}`}
          ></div>
        </div>
        {contacts &&
          contacts?.length !== 0 &&
          contacts.map(user => (
            <div
              className={styles.profile}
              key={user._id}
              onClick={() => {
                setNewChat(false);
                props.addCurrentContact(user);
                props.fetchMessages(user._id);
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
      <div className={`${styles.profile} ${styles.fixed} ${styles.header}`}>
        <img
          className={styles.profile_header_img}
          src="portitem1.jpeg"
          alt=""
        />
        <div className={styles.header_icons}>
          <MdMessage
            size="30px"
            className={styles.MdMessage}
            onClick={() => setNewChat(chat => !chat)}
          />
          <div
            className={`${styles.icon_box} ${
              !hideMenu && styles.icon_box_color
            }`}
            onClick={() => setHideMenu(hide => !hide)}
          >
            <div className={styles.select_icon}></div>
            <div className={styles.select_icon}></div>
            <div className={styles.select_icon}></div>
          </div>
        </div>
        <div
          className={`${styles.profile_input} ${styles.search} ${styles.fixed_input}`}
        >
          <input
            type="text"
            className={styles.input}
            placeholder="Search or start a new chat"
            onChange={e => {
              props.filterRecentChats(e.target.value);
              setHideIcon(true);
            }}
            onMouseLeave={() => setHideIcon(false)}
          />
          <BiSearchAlt
            className={`${styles.BiSearchAlt} ${hideIcon && styles.hide_icon}`}
          />
        </div>
      </div>
      <div className={`${styles.profile}`}>
        <div
          ref={menuRef}
          className={`${styles.box} ${hideMenu && styles.hideMenu}`}
        >
          <div>
            <p>New Group</p>
          </div>
          <div>
            <p>Profile</p>
          </div>
          <div>
            <p>box</p>
          </div>
          <div>
            <p>box</p>
          </div>
          <div>
            <p>box</p>
          </div>
          <div>
            <p>box</p>
          </div>
        </div>
      </div>
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
                  {formatDistance(
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
  filterContact,
  addCurrentContact,
  fetchMessages,
  filterRecentChats
})(Main);
