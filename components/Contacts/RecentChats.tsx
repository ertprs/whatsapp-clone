import styles from "../../styles/contacts.module.css";
import React from "react";
import { formatDistance } from "date-fns";
import { Message } from "../../interfaces/Message";
import { User } from "../../interfaces/User";
import {
  AddCurrentContact,
  addCurrentContact,
  fetchMessages,
  ResetMsgCount,
  resetMsgCount,
  SetDisplay,
  setDisplay,
  SetGroupChat,
  setGroupChat,
  SetGroupInfo,
  setGroupInfo,
  SetGroupMsgInfo,
  setGroupMsgInfo,
  SetGroupSearch,
  setGroupSearch
} from "../../redux/actions";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Redux } from "../../interfaces/Redux";
import { BsCheckAll } from "react-icons/bs";

interface Props {
  filteredRecentChats: Message[] | [] | null;
  currentUser: User | null;
  addCurrentContact: (user: User) => AddCurrentContact;
  fetchMessages: Function;
  setDisplay: (display: boolean) => SetDisplay;
  setGroupChat: (set: boolean) => SetGroupChat;
  setGroupInfo: (set: boolean) => SetGroupInfo;
  setGroupSearch: (set: boolean) => SetGroupSearch;
  setGroupMsgInfo: (set: boolean) => SetGroupMsgInfo;
  resetMsgCount: (chatId: string) => ResetMsgCount;
  messages:
    | Message[]
    | []
    | {
        message: string | null;
        to: User;
        from: User;
        createdAt: string;
      }[]
    | null;
}
const RecentChats: React.FC<Props> = props => {
  const currentUser = useSelector((state: Redux) => state.user.currentUser);
  return (
    <React.Fragment>
      {props.filteredRecentChats &&
        props.filteredRecentChats.length !== 0 &&
        (props.filteredRecentChats as Message[]).map(msg => (
          <div
            className={styles.profile}
            key={msg._id}
            onClick={() => {
              if (props.currentUser?._id.toString() === msg.to._id.toString()) {
                props.addCurrentContact(msg.from);
                props.fetchMessages(msg.from._id);
              } else {
                props.addCurrentContact(msg.to);
                props.fetchMessages(msg.to._id);
              }
              props.setDisplay(false);
              props.setGroupChat(false);
              props.setGroupInfo(false);
              props.setGroupSearch(false);
              props.setGroupMsgInfo(false);
              if (msg.from._id !== currentUser?._id) {
                props.resetMsgCount(msg.chatId!);
              }
            }}
          >
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.user}>
              <div className={styles.user_header}>
                <h2>
                  {props.currentUser?._id.toString() === msg.to._id.toString()
                    ? `${msg.from.firstName} ${msg.from.lastName} `
                    : `${msg.to.firstName} ${msg.to.lastName} `}
                </h2>
                <p>
                  {formatDistance(
                    new Date(msg.updatedAt as string),
                    Date.now()
                  )}
                </p>
              </div>
              <div className={styles.message}>
                <BsCheckAll
                  size="17px"
                  style={{ transform: "rotate(-10deg)" }}
                  color="#4fc3f7"
                  className={styles.BsCheckAll}
                />
                <p className={styles.msg_text}>{msg.message}</p>
                <div className={styles.unread}>
                  {msg.from._id !== currentUser?._id && msg.count !== 0 && (
                    <p>{msg.count}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};

export default connect(null, dispatch =>
  bindActionCreators(
    {
      addCurrentContact,
      fetchMessages,
      setDisplay,
      setGroupChat,
      setGroupInfo,
      setGroupSearch,
      setGroupMsgInfo,
      resetMsgCount
    },
    dispatch
  )
)(RecentChats);
