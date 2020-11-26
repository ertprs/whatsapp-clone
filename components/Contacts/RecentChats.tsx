import styles from "../../styles/contacts.module.css";
import React from "react";
import { formatDistance } from "date-fns";
import { Message } from "../../interfaces/Message";
import { User } from "../../interfaces/User";
import {
  AddCurrentContact,
  addCurrentContact,
  fetchMessages,
  SetDisplay,
  setDisplay,
  SetGroupChat,
  setGroupChat
} from "../../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

interface Props {
  filteredRecentChats: Message[] | [] | null;
  currentUser: User | null;
  addCurrentContact: (user: User) => AddCurrentContact;
  fetchMessages: Function;
  setDisplay: (display: boolean) => SetDisplay;
  setGroupChat: (set: boolean) => SetGroupChat;
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
                  {props.messages && props.messages.length !== 0
                    ? formatDistance(
                        new Date(
                          props.messages![props.messages!.length - 1]
                            .createdAt as string
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
    </React.Fragment>
  );
};

export default connect(null, dispatch =>
  bindActionCreators(
    { addCurrentContact, fetchMessages, setDisplay, setGroupChat },
    dispatch
  )
)(RecentChats);
