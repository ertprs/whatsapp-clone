import { formatDistance } from "date-fns";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Group } from "../../interfaces/Group";
import { GroupMsg } from "../../interfaces/GroupMsg";
import { Redux } from "../../interfaces/Redux";
import {
  AddCurrentGroup,
  addCurrentGroup,
  fetchGroupMessages,
  SetGroupChat,
  setGroupChat,
  SetGroupContainer,
  setGroupContainer,
  setGroupDisplay,
  SetGroupDisplay,
  SetGroupInfo,
  setGroupInfo,
  SetGroupMsgInfo,
  setGroupMsgInfo,
  SetGroupSearch,
  setGroupSearch,
  SetGrpScrollMsg,
  setGrpScrollMsg
} from "../../redux/actions";
import styles from "../../styles/group.module.css";

interface Props {
  setGroupContainer: (set: boolean) => SetGroupContainer;
  fetchGroupMessages: (groupId: string) => void;
  setGroupChat: (set: boolean) => SetGroupChat;
  addCurrentGroup: (grp: Group) => AddCurrentGroup;
  setGroupDisplay: (set: boolean) => SetGroupDisplay;
  setGrpScrollMsg: (msg: GroupMsg | null) => SetGrpScrollMsg;
  setGroupSearch: (set: boolean) => SetGroupSearch;
  setGroupInfo: (set: boolean) => SetGroupInfo;
  setGroupMsgInfo: (set: boolean) => SetGroupMsgInfo;
}
const GroupComponent: React.FC<Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const groupContainer = useSelector(
    (state: Redux) => state.group.groupContainer
  );
  const groups = useSelector((state: Redux) => state.group.groups);
  const currentUser = useSelector((state: Redux) => state.user.currentUser);
  const groupDisplay = useSelector((state: Redux) => state.group.groupDisplay);
  const renderMessage = (grp: Group): string => {
    if (!grp.lastMessage && grp.admin === currentUser?._id) {
      return "You created this group";
    }
    if (!grp.lastMessage && grp.admin !== currentUser?._id) {
      return "You were added";
    }
    if (grp.lastMessage) {
      return grp.lastMessage.message;
    }
    return "";
  };
  const renderTick = (grp: Group) => {
    if (
      grp.lastMessage?.readBy?.length === grp.participants.length &&
      ((grp.lastMessage.from as unknown) as string) === currentUser?._id
    ) {
      return (
        <BsCheckAll
          size="17px"
          style={{ transform: "rotate(-10deg) translateX(-3px)" }}
          color="#4fc3f7"
        />
      );
    }
    if (
      grp.lastMessage?.deliveredTo?.length === grp.participants.length &&
      grp.lastMessage.readBy?.length !== grp.participants.length &&
      ((grp.lastMessage.from as unknown) as string) === currentUser?._id
    ) {
      return (
        <BsCheckAll
          size="17px"
          style={{ transform: "rotate(-10deg) translateX(-3px)" }}
          color="rgba(0,0,0,.5)"
        />
      );
    }
    if (((grp.lastMessage?.from as unknown) as string) === currentUser?._id) {
      return (
        <BsCheck
          size="17px"
          style={{ transform: "rotate(-10deg) translateX(-3px)" }}
          color="rgba(0,0,0,0.5)"
        />
      );
    }

    // if (!msg.read) {
    //   return <div className={styles.bold_text}></div>;
    // }
  };
  const filteredGroups =
    groups && groups.length !== 0 && input.trim().length === 0
      ? groups
      : groups?.filter(grp => grp.name.includes(input));
  return (
    <div
      className={`${groupContainer ? styles.groupContainer : ""} ${
        groupDisplay ? styles.groupDisplay : ""
      }`}
    >
      <div className={`${styles.header} ${focused ? styles.focused : ""}`}>
        <div className={styles.header_icon}>
          <div>
            <HiOutlineArrowLeft
              size="30px"
              className={styles.HiOutlineArrowLeft}
              onClick={() => {
                props.setGroupChat(false);
                props.setGroupContainer(false);
                props.setGroupSearch(false);
                props.setGroupInfo(false);
                props.setGroupMsgInfo(false);
              }}
            />
          </div>
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
            onChange={e => setInput(e.target.value)}
            value={input}
            placeholder="Search Group"
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.body}>
          {(filteredGroups as Group[]).map(grp => (
            <div
              className={styles.group}
              key={grp._id}
              onClick={() => {
                props.setGroupChat(true);
                props.setGrpScrollMsg(null);
                props.fetchGroupMessages(grp._id);
                props.addCurrentGroup(grp);
                props.setGroupDisplay(false);
              }}
            >
              <img src="portitem1.jpeg" alt="pfp" />
              <div className={styles.text_body}>
                <div className={styles.metadata}>
                  <h2>{grp.name}</h2>
                  <p>{formatDistance(new Date(grp.updatedAt), Date.now())}</p>
                </div>
                <div className={styles.message}>
                  {renderTick(grp)}
                  <p className={styles.msg}>{renderMessage(grp)}</p>
                  <div className={styles.unread}>
                    {grp.count !== 0 && grp.count !== undefined && (
                      <p>{grp.count}</p>
                    )}
                  </div>
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
    {
      setGroupContainer,
      fetchGroupMessages,
      setGroupChat,
      addCurrentGroup,
      setGroupDisplay,
      setGrpScrollMsg,
      setGroupSearch,
      setGroupInfo,
      setGroupMsgInfo
    },
    dispatch
  )
)(GroupComponent);
