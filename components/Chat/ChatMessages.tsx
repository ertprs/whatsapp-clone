import styles from "../../styles/chat.module.css";
import React, { useEffect, useState } from "react";
import { User } from "../../interfaces/User";
import { Message } from "../../interfaces/Message";
import { io } from "../../pages";
import { MdDelete, MdSend } from "react-icons/md";
import { BsCheck, BsCheckAll, BsInfoCircleFill } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { formatDistance } from "date-fns";
import { IoMdShareAlt } from "react-icons/io";
import { connect, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { setShowMessageInfo, SetShowMessageInfo } from "../../redux/actions";
import { bindActionCreators } from "redux";
import { renderTick } from "./RenderTick";
import SelectedMessagesBox from "./SelectedMessagesBox";

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
  setSelectMessages: React.Dispatch<React.SetStateAction<boolean>>;
  selectMessages: boolean;
  setShowMessageInfo: (msg: Message | null) => SetShowMessageInfo;
}

const ChatMessages: React.FC<Props> = props => {
  const [selected, setSelected] = useState<string[]>([]);
  const showSearchMessage = useSelector(
    (state: Redux) => state.message.showSearchMessage
  ) as Redux["message"]["showSearchMessage"];
  const scrollMessage = useSelector(
    (state: Redux) => state.message.scrollMessage
  ) as Redux["message"]["scrollMessage"];
  const showMessageInfo = useSelector(
    (state: Redux) => state.message.showMessageInfo
  ) as Redux["message"]["showMessageInfo"];

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset === 0) {
        console.log("at the top");
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <React.Fragment>
      {props.currentContact && !props.messages && (
        <div className={styles.spinner}>
          <div className={`ui active centered inline loader`}></div>
          <p>fetching messages</p>
        </div>
      )}
      {props.currentContact && props.messages && (
        <React.Fragment>
          <span
            className={`${props.selectMessages ? styles.show : ""} ${
              showMessageInfo && styles.showMessageInfo
            }`}
          >
            <SelectedMessagesBox
              currentUser={props.currentUser}
              messages={props.messages}
              selected={selected}
              setSelectMessages={props.setSelectMessages}
              setSelected={setSelected}
            />
          </span>
          <div
            className={
              props.showContactInfo || showSearchMessage || showMessageInfo
                ? styles.contact_info_input
                : ""
            }
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
                  <label
                    htmlFor={msg.createdAt}
                    className={`${
                      props.selectMessages ? styles.msg_parent : ""
                    } ${
                      msg._id && selected.includes(msg._id)
                        ? styles.selected
                        : ""
                    }`}
                    key={msg.createdAt}
                  >
                    <div
                      className={
                        props.selectMessages ? styles.show_checkbox : ""
                      }
                    >
                      {scrollMessage && scrollMessage?._id === msg._id && (
                        <React.Suspense fallback={<div></div>}>
                          <ScrollIntoViewIfNeeded active={props.active}>
                            <div></div>
                          </ScrollIntoViewIfNeeded>
                        </React.Suspense>
                      )}
                      <input
                        type="checkbox"
                        name={msg.createdAt}
                        id={msg.createdAt}
                        className={styles.show_tick}
                        onChange={() => {
                          if (props.selectMessages) {
                            let arr = [...selected];
                            if (msg._id) {
                              const index = arr.indexOf(msg._id!);
                              if (index !== -1) {
                                arr.splice(index, 1);
                              } else {
                                arr = [msg._id, ...arr];
                              }
                              setSelected(arr);
                            }
                          }
                        }}
                        checked={msg._id ? selected.includes(msg._id) : false}
                      />

                      <span className={styles.checkbox}>
                        <span>
                          <GoCheck className={styles.tick} />
                        </span>
                      </span>
                    </div>
                    <div
                      className={`${
                        msg.from._id === props.currentUser!._id
                          ? styles.right_text
                          : styles.left_text
                      } ${
                        scrollMessage &&
                        scrollMessage._id &&
                        msg._id &&
                        scrollMessage._id === msg._id
                          ? styles.scrollMessage
                          : ""
                      }`}
                      key={msg.createdAt}
                    >
                      <p>{msg.message}</p>
                      <div className={styles.metadata}>
                        <p>
                          {formatDistance(new Date(msg.createdAt), Date.now())}
                        </p>
                        {renderTick(msg, {
                          currentContact: props.currentContact,
                          currentUser: props.currentUser
                        })}
                      </div>
                    </div>
                  </label>
                );
              })}
          </div>
          {!scrollMessage && (
            <React.Suspense fallback={<div></div>}>
              <ScrollIntoViewIfNeeded active={props.active}>
                <div></div>
              </ScrollIntoViewIfNeeded>
            </React.Suspense>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default connect(null, dispatch =>
  bindActionCreators({ setShowMessageInfo }, dispatch)
)(ChatMessages);
