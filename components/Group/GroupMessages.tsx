import { formatDistance } from "date-fns";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { GroupMsg } from "../../interfaces/GroupMsg";
import { User } from "../../interfaces/User";
import styles from "../../styles/groupChat.module.css";
let ScrollIntoViewIfNeeded: any;
if (typeof window !== "undefined") {
  ScrollIntoViewIfNeeded = React.lazy(
    () => import("react-scroll-into-view-if-needed")
  );
}

interface Props {
  groupMessages: GroupMsg[] | null;
  grpScrollMsg: GroupMsg | null;
  currentUser: User | null;
  selectedMessages: string[];
  setSelectedMessages: React.Dispatch<React.SetStateAction<string[]>>;
  active: boolean;
  renderTick: (grpMsg: GroupMsg) => JSX.Element | undefined;
  selectGroupMessages: boolean;
}

const GroupMessages: React.FC<Props> = props => {
  const {
    groupMessages,
    currentUser,
    grpScrollMsg,
    selectedMessages,
    setSelectedMessages,
    active,
    renderTick,
    selectGroupMessages
  } = props;
  return (
    <React.Fragment>
      {groupMessages &&
        groupMessages?.length !== 0 &&
        (groupMessages as GroupMsg[]).map(msg =>
          msg.from._id.toString() === currentUser?._id.toString() ? (
            <span
              className={`${
                msg._id && selectedMessages.indexOf(msg._id) !== -1
                  ? styles.checked
                  : ""
              }`}
            >
              <label
                htmlFor={msg.createdAt}
                className={`${styles.right_text} `}
                key={msg.createdAt}
              >
                <div>
                  <div className={styles.BiCheck}>
                    <BiCheck
                      size="25px"
                      className={styles.check}
                      color="white"
                    />
                    <div className={styles.check_label}>&nbsp;</div>
                  </div>
                  {grpScrollMsg && grpScrollMsg._id === msg._id && (
                    <React.Suspense fallback={<div></div>}>
                      <ScrollIntoViewIfNeeded active={active}>
                        <div></div>
                      </ScrollIntoViewIfNeeded>
                    </React.Suspense>
                  )}
                  <input
                    type="checkbox"
                    id={msg.createdAt}
                    name={msg.createdAt}
                    checked={!!selectedMessages.find(ms => ms === msg._id)}
                    onChange={() => {
                      if (selectGroupMessages && msg._id) {
                        const selectedMsgs = [...selectedMessages];
                        const msgIndx = selectedMsgs.indexOf(msg._id);
                        if (msgIndx !== -1) {
                          selectedMsgs.splice(msgIndx, 1);
                          setSelectedMessages(selectedMsgs);
                        } else {
                          setSelectedMessages([msg._id, ...selectedMessages]);
                        }
                      }
                    }}
                  />
                </div>
                <div
                  className={`${styles.message} ${
                    grpScrollMsg && grpScrollMsg._id === msg._id
                      ? styles.grpScrollMsg
                      : ""
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className={styles.date}>
                    <span>
                      {formatDistance(new Date(msg.createdAt), Date.now())}
                    </span>
                    <span>{renderTick(msg)}</span>
                  </p>
                </div>
              </label>
            </span>
          ) : (
            <span
              className={`${
                msg._id && selectedMessages.indexOf(msg._id) !== -1
                  ? styles.checked
                  : ""
              }`}
            >
              <label
                htmlFor={msg.createdAt}
                className={`${styles.left_text}  `}
                key={msg.createdAt}
              >
                {" "}
                <div>
                  {" "}
                  <div className={styles.BiCheck}>
                    <BiCheck
                      size="25px"
                      className={styles.check}
                      color="white"
                    />
                    <div className={styles.check_label}>&nbsp;</div>
                  </div>
                  {grpScrollMsg && grpScrollMsg._id === msg._id && (
                    <React.Suspense fallback={<div></div>}>
                      <ScrollIntoViewIfNeeded active={active}>
                        <div></div>
                      </ScrollIntoViewIfNeeded>
                    </React.Suspense>
                  )}
                  <input
                    type="checkbox"
                    id={msg.createdAt}
                    name={msg.createdAt}
                    checked={!!selectedMessages.find(ms => ms === msg._id)}
                    onChange={() => {
                      if (selectGroupMessages && msg._id) {
                        const selectedMsgs = [...selectedMessages];
                        const msgIndx = selectedMsgs.indexOf(msg._id);
                        if (msgIndx !== -1) {
                          selectedMsgs.splice(msgIndx, 1);
                          setSelectedMessages(selectedMsgs);
                        } else {
                          setSelectedMessages([msg._id, ...selectedMessages]);
                        }
                      }
                    }}
                  />
                </div>
                <div
                  className={`${styles.message} ${
                    grpScrollMsg && grpScrollMsg._id === msg._id
                      ? styles.grpScrollMsg
                      : ""
                  }`}
                >
                  <p className={styles.name}>
                    {msg.from.firstName} {msg.from.lastName}
                  </p>
                  <p>{msg.message}</p>
                  <p className={styles.date}>
                    {formatDistance(new Date(msg.createdAt), Date.now())}
                  </p>
                </div>
              </label>
            </span>
          )
        )}
    </React.Fragment>
  );
};

export default GroupMessages;
