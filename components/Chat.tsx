import React, { useState } from "react";
import styles from "../styles/chat.module.css";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import { axios } from "../Axios";

const Chat = () => {
  const [input, setInput] = useState<string>("");
  const currentContact = useSelector<Redux>(
    state => state.user.currentContact
  ) as Redux["user"]["currentContact"];
  const messages = useSelector<Redux>(
    state => state.message.messages
  ) as Redux["message"]["messages"];
  const sendMessage = async (
    messageInfo: { message: string | null; to: string },
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      if (
        !messageInfo.message ||
        (messageInfo.message && messageInfo.message.trim() == "")
      ) {
        return;
      }
      setInput("");
      const res = await axios.post("/api/new/message", messageInfo);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className={` ${currentContact ? styles.spinner : styles.container}`}>
      <div className={styles.chatHeader}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.userInfo}>
          <h1>
            {currentContact?.firstName} {currentContact?.lastName}
          </h1>
          <p>{currentContact?.status}</p>
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
          <div className={`ui active centered inline loader `}></div>
          <p>fetching messages</p>
        </div>
      )}
      {currentContact && messages && (
        <React.Fragment>
          <div>
            <form
              onSubmit={e =>
                sendMessage({ message: input, to: currentContact._id }, e)
              }
              className={styles.input_container}
            >
              <input
                type="text"
                className={styles.input}
                onChange={e => setInput(e.target.value)}
                value={input}
              />
              <div className={styles.MdSend}>
                <MdSend size="20px" />
              </div>
            </form>
          </div>
          <div className={styles.right_text}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
              ullam.
            </p>
            <div className={styles.metadata}>
              <p>2:11</p>
              <img
                src="128px-Blue_double_ticks.svg.png"
                alt="tick"
                className={styles.tick}
              />
            </div>
          </div>
          <div className={styles.left_text}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reprehenderit, natus!
            </p>
            <div className={styles.metadata}>
              <p>2:11</p>
              <img
                src="check-mark-grey.svg.med.png"
                alt="grey-tick"
                className={styles.tick}
              />
            </div>
          </div>
          <div className={styles.right_text}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
              ullam.
            </p>
            <div className={styles.metadata}>
              <p>2:11</p>
              <img
                src="clipart1064340.png"
                alt="single-tick"
                className={styles.tick_rotate}
              />
            </div>
          </div>

          <div className={styles.left_text}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reprehenderit, natus!
            </p>
            <div className={styles.metadata}>
              <p>2:11</p>
              <img
                src="check-mark-grey.svg.med.png"
                alt="grey-tick"
                className={styles.tick}
              />
            </div>
          </div>
          <div className={styles.right_text}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
              ullam.
            </p>
            <div className={styles.metadata}>
              <p>2:11</p>
              <img
                src="clipart1064340.png"
                alt="single-tick"
                className={styles.tick_rotate}
              />
            </div>
          </div>
        </React.Fragment>
      )}

      <div className={styles.message_start}></div>
    </div>
  );
};

export default Chat;
