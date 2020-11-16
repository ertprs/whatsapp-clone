import styles from "../../styles/chat.module.css";
import React from "react";
import { User } from "../../interfaces/User";
import { Message } from "../../interfaces/Message";
import { io } from "../../pages";
import { MdSend } from "react-icons/md";
import { formatDistance } from "date-fns";

let ScrollIntoViewIfNeeded: any;
if (typeof window !== "undefined") {
  ScrollIntoViewIfNeeded = React.lazy(
    () => import("react-scroll-into-view-if-needed")
  );
}

interface Props {
  currentContact: User | null;
  messages: Message[] | [] | null;
  sendMessage: (
    msgDetails: {
      message: string | null;
      to: User;
      from: User;
      createdAt: string;
    },
    e: React.FormEvent<HTMLFormElement> | any
  ) => void;
  currentUser: User | null;
  input: string;
  active: boolean;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  showContactInfo: boolean;
}

const ChatMessages: React.FC<Props> = props => {
  const renderTick = (msg: Message): JSX.Element => {
    if (!msg._id) {
      return <span></span>;
    }
    if (
      msg._id &&
      !msg.read &&
      msg.secondTick &&
      msg.to._id.toString() !== props.currentUser?._id.toString() &&
      props.currentContact?._id.toString() === msg.to._id.toString()
    ) {
      // DOUBLE TICK
      return (
        <img
          src="check-mark-grey.svg.med.png"
          alt="tick"
          className={styles.tick}
        />
      );
    }
    if (
      msg._id &&
      !msg.read &&
      msg.to._id.toString() !== props.currentUser?._id.toString()
    ) {
      // SINGLE TICK
      return (
        <img src="clipart1064340.png" alt="tick" className={styles.tick} />
      );
    }

    if (
      msg.read &&
      props.currentContact &&
      props.currentContact._id.toString() === msg.to._id.toString()
    ) {
      // BLUE TICK
      return (
        <img
          src="128px-Blue_double_ticks.svg.png"
          alt="tick"
          className={styles.tick}
        />
      );
    }
    return <span></span>;
  };
  return (
    <React.Fragment>
      {props.currentContact && !props.messages && (
        <div>
          <div className={`ui active centered inline loader`}></div>
          <p>fetching messages</p>
        </div>
      )}
      {props.currentContact && props.messages && (
        <React.Fragment>
          <div
            className={props.showContactInfo ? styles.contact_info_input : ""}
          >
            <form
              onSubmit={e =>
                props.sendMessage(
                  {
                    message: props.input,
                    to: props.currentContact!,
                    from: props.currentUser!,
                    createdAt: new Date().toISOString()
                  },
                  e
                )
              }
              className={styles.input_container}
            >
              <input
                type="text"
                className={styles.input}
                onChange={e => props.setInput(e.target.value)}
                value={props.input}
                onFocus={() => {
                  const user = {
                    ...props.currentUser,
                    typing: true,
                    online: true,
                    updatedAt: new Date().toISOString()
                  } as User;
                  io.emit("typing", { action: "change", user });
                  io.emit("active", { action: "change", user });
                }}
                onBlur={() => {
                  const user = {
                    ...props.currentUser,
                    typing: false,
                    online: true,
                    updatedAt: new Date().toISOString()
                  } as User;
                  io.emit("typing", { action: "change", user });
                  io.emit("active", { action: "change", user });
                }}
              />
              <button className={styles.MdSend} type="submit">
                <MdSend size="20px" />
              </button>
            </form>
          </div>
          <div>
            {props.messages.length !== 0 &&
              (props.messages as Message[]).map(msg => {
                return (
                  <div
                    className={`${
                      msg.from._id === props.currentUser!._id
                        ? styles.right_text
                        : styles.left_text
                    }`}
                    key={msg.createdAt}
                  >
                    <p>{msg.message}</p>
                    <div className={styles.metadata}>
                      <p>
                        {formatDistance(new Date(msg.createdAt), Date.now())}
                      </p>
                      {renderTick(msg)}
                    </div>
                  </div>
                );
              })}
          </div>
          <React.Suspense fallback={<div></div>}>
            <ScrollIntoViewIfNeeded active={props.active}>
              <div></div>
            </ScrollIntoViewIfNeeded>
          </React.Suspense>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChatMessages;
