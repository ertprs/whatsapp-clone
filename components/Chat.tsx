import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/chat.module.css";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { connect, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import { axios } from "../Axios";
import { Message } from "../interfaces/Message";
import {
  addNewMessage,
  AddNewMessage,
  updateUser,
  updateRead
} from "../redux/actions";
import { io } from "../pages";
import { User } from "../interfaces/User";

interface Props {
  updateUser: (userAttrs: { [key: string]: boolean }) => void;
  addNewMessage: (msg: {
    message: string | null;
    to: User;
    from: User;
    createdAt: string;
  }) => void;
  updateRead: (msgIds: string[]) => void;
}

const Chat: React.FC<Props> = props => {
  const [input, setInput] = useState<string>("");
  const [height, setHeight] = useState<string>("100vh");
  const currentContact = useSelector<Redux>(
    state => state.user.currentContact
  ) as Redux["user"]["currentContact"];
  const currentUser = useSelector<Redux>(
    state => state.user.currentUser
  ) as Redux["user"]["currentUser"];
  const messages = useSelector<Redux>(
    state => state.message.messages
  ) as Redux["message"]["messages"];
  const messagesLoading = useSelector<Redux>(
    state => state.message.messagesLoading
  ) as Redux["message"]["messagesLoading"];
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useRef<HTMLDivElement>(null);
  const usePrevious = (value: number) => {
    const ref = useRef<number>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevOffsetHeight = usePrevious(
    containerRef.current ? containerRef.current.offsetHeight : 0
  );
  useEffect(() => {
    if (messages && messages.length > 7) {
      setHeight("100%");
    } else {
      setHeight("100vh");
    }

    if (scrollToBottom && scrollToBottom.current) {
      scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
    }
    if (messages) {
      const unreadIdMessagIds = (messages as Message[])
        .filter(
          (msg: Message) =>
            !msg.read && currentUser?._id.toString() !== msg.from._id.toString()
        )
        .map(msg => msg._id);
      if (unreadIdMessagIds.length !== 0) {
        props.updateRead(unreadIdMessagIds as string[]);
      }
    }
  }, [messages ? messages.length : messages]);

  const sendMessage = async (
    messageInfo: {
      message: string | null;
      to: User;
      from: User;
      createdAt: string;
    },
    e: React.FormEvent<HTMLFormElement> | any
  ) => {
    try {
      e.preventDefault();
      if (
        !messageInfo.message ||
        (messageInfo.message && messageInfo.message.trim() == "")
      ) {
        return;
      }
      props.addNewMessage(messageInfo);
      setInput("");
      await axios.post("/api/new/message", {
        ...messageInfo,
        to: messageInfo.to._id
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const renderUserInfo = (): JSX.Element => {
    if (currentContact?.typing) {
      return <p>Typing...</p>;
    }
    if (currentContact?.online) {
      return <p>Online</p>;
    }
    if (currentContact?.status) {
      return <p>{currentContact.status}</p>;
    }
    return <p></p>;
  };
  const renderTick = (msg: Message): JSX.Element => {
    if (!msg._id) {
      return <span></span>;
    }
    if (msg._id && !msg.read) {
      // SINGLE TICK
      return (
        <img src="clipart1064340.png" alt="tick" className={styles.tick} />
      );
    }
    // if(msg._id&&currentContact){

    // }
    if (
      msg.read &&
      currentContact &&
      currentContact._id.toString() === msg.to._id.toString()
    ) {
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
    <div
      className={` ${messagesLoading ? styles.spinner : styles.container}`}
      style={{ height: height }}
      key={height}
      ref={containerRef}
    >
      <div className={styles.chatHeader}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.userInfo}>
          <h1>
            {currentContact?.firstName} {currentContact?.lastName}
          </h1>
          {renderUserInfo()}
        </div>
        <div className={styles.chatIcons}>
          <ImAttachment size="20px" className={styles.ImAttachment} />
          <div>
            <div className={styles.select_icon}></div>
            <div className={styles.select_icon}></div>
            <div className={styles.select_icon}></div>
          </div>
        </div>
      </div>
      <div className={styles.message_start}></div>
      {currentContact && !messages && (
        <div>
          <div className={`ui active centered inline loader`}></div>
          <p>fetching messages</p>
        </div>
      )}
      {currentContact && messages && (
        <React.Fragment>
          <div>
            <form
              onSubmit={e =>
                sendMessage(
                  {
                    message: input,
                    to: currentContact,
                    from: currentUser!,
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
                onChange={e => setInput(e.target.value)}
                value={input}
                onFocus={() => {
                  const user = {
                    ...currentUser,
                    typing: true,
                    online: true,
                    updatedAt: new Date().toISOString()
                  } as User;
                  io.emit("typing", { action: "change", user });
                  io.emit("active", { action: "change", user });
                }}
                onBlur={() => {
                  const user = {
                    ...currentUser,
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
            {messages.length !== 0 &&
              (messages as Message[]).map(msg => {
                return (
                  <div
                    className={`${
                      msg.from._id === currentUser!._id
                        ? styles.right_text
                        : styles.left_text
                    }`}
                    key={msg.createdAt}
                  >
                    <p>{msg.message}</p>
                    <div className={styles.metadata}>
                      <p>{new Date(msg.createdAt).toLocaleDateString()}</p>
                      {renderTick(msg)}
                    </div>
                  </div>
                );
              })}
          </div>
          <div ref={scrollToBottom}></div>
        </React.Fragment>
      )}

      <div className={styles.message_start}></div>
    </div>
  );
};

export default connect(null, { updateUser, addNewMessage, updateRead })(Chat);
