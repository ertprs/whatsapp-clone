import { formatDistance } from "date-fns";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Group } from "../../interfaces/Group";
import { Redux } from "../../interfaces/Redux";
import {
  fetchGroupMessages,
  SetGroupChat,
  setGroupChat,
  SetGroupContainer,
  setGroupContainer
} from "../../redux/actions";
import styles from "../../styles/group.module.css";

interface Props {
  setGroupContainer: (set: boolean) => SetGroupContainer;
  fetchGroupMessages: (groupId: string) => void;
  setGroupChat: (set: boolean) => SetGroupChat;
}
const GroupComponent: React.FC<Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  const groupContainer = useSelector(
    (state: Redux) => state.group.groupContainer
  );
  const groups = useSelector((state: Redux) => state.group.groups);
  const currentUser = useSelector((state: Redux) => state.user.currentUser);
  const renderMessage = (grp: Group): string => {
    if (!grp.lastMessage && grp.admin === currentUser?._id) {
      return "You created this group";
    }
    if (!grp.lastMessage && grp.admin !== currentUser?._id) {
      return "You were added";
    }
    if (grp.lastMessage) {
      return grp.lastMessage;
    }
    return "";
  };
  return (
    <div className={groupContainer ? styles.groupContainer : ""}>
      <div className={`${styles.header} ${focused ? styles.focused : ""}`}>
        <div className={styles.header_icon}>
          <HiOutlineArrowLeft
            size="30px"
            className={styles.HiOutlineArrowLeft}
            onClick={() => props.setGroupContainer(false)}
          />
          <p>Groups</p>
        </div>
        <div className={styles.input}>
          <div>
            <div className={styles.icons}>
              <BiSearchAlt
                size="20px"
                color="rgb(80,80,80)"
                className={styles.BiSearchAlt}
              />
              <HiOutlineArrowLeft
                size="20px"
                className={styles.HiOutlineArrowLeft}
                color="#00bfa5"
              />
            </div>
          </div>
          <input
            type="text"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search Group"
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.body}>
          {groups &&
            groups.length !== 0 &&
            (groups as Group[]).map(grp => (
              <div
                className={styles.group}
                key={grp._id}
                onClick={() => {
                  props.setGroupChat(true);
                  props.fetchGroupMessages(grp._id);
                }}
              >
                <img src="portitem1.jpeg" alt="pfp" />
                <div className={styles.text_body}>
                  <div className={styles.metadata}>
                    <h2>{grp.name}</h2>
                    <p>{formatDistance(new Date(grp.updatedAt), Date.now())}</p>
                  </div>
                  <div className={styles.message}>
                    <p>{renderMessage(grp)}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default connect<{}, Props>(null, dispatch =>
  bindActionCreators(
    { setGroupContainer, fetchGroupMessages, setGroupChat },
    dispatch
  )
)(GroupComponent);
