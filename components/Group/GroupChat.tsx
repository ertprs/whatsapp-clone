import { formatDistance } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { BsCheck, BsCheckAll, BsInfoCircleFill } from "react-icons/bs";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete, MdSend } from "react-icons/md";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axios } from "../../Axios";
import { Group } from "../../interfaces/Group";
import { GroupMsg } from "../../interfaces/GroupMsg";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import {
  AddGroupMessage,
  addGroupMessage,
  SetGroupDisplay,
  setGroupDisplay,
  SetGroupMsgInfo,
  setGroupMsgInfo,
  SetGroupSearch,
  setGroupSearch,
  SetSelectGroupMessages,
  setSelectGroupMessages,
  updateGroupRead
} from "../../redux/actions";
import styles from "../../styles/groupChat.module.css";
import GroupBox from "./GroupBox";
import GroupChatHeader from "./GroupChatHeader";
import GroupMessages from "./GroupMessages";
let ScrollIntoViewIfNeeded: any;
if (typeof window !== "undefined") {
  ScrollIntoViewIfNeeded = React.lazy(
    () => import("react-scroll-into-view-if-needed")
  );
}

interface Props {
  setSelectGroupMessages: (set: boolean) => SetSelectGroupMessages;
  setGroupDisplay: (set: boolean) => SetGroupDisplay;
  addGroupMessage: (msg: GroupMsg) => AddGroupMessage;
  updateGroupRead: (data: { messageIds: string[]; readBy: string }) => void;
  setGroupSearch: (set: boolean) => SetGroupSearch;
  setGroupMsgInfo: (set: boolean) => SetGroupMsgInfo;
}
const GroupChat: React.FC<Props> = props => {
  const [showBox, setShowBox] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const currentUser = useSelector((state: Redux) => state.user.currentUser);
  const groupInfo = useSelector((state: Redux) => state.group.groupInfo);
  const groupChat = useSelector((state: Redux) => state.group.groupChat);
  const currentGroup = useSelector((state: Redux) => state.group.currentGroup);
  const groupSearch = useSelector((state: Redux) => state.group.groupSearch);
  const grpScrollMsg = useSelector((state: Redux) => state.group.grpScrollMsg);
  const groupMessageInfo = useSelector(
    (state: Redux) => state.group.groupMessageInfo
  );
  const selectGroupMessages = useSelector(
    (state: Redux) => state.group.selectGroupMessages
  );
  const groupMessages = useSelector(
    (state: Redux) => state.group.groupMessages
  );
  const groupMessageLoading = useSelector(
    (state: Redux) => state.group.groupMessageLoading
  );
  const usePrevious = (value: number) => {
    const ref = useRef<number>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevMsgLength = usePrevious(groupMessages ? groupMessages.length : 0);
  useEffect(() => {
    selectGroupMessages && setShowBox(false);
  }, [selectGroupMessages]);
  useEffect(() => {
    if (!groupChat) {
      props.setSelectGroupMessages(false);
      setSelectedMessages([]);
    }
  }, [groupChat]);
  useEffect(() => {
    !groupMessages && setActive(false);
    if (groupMessages) {
      prevMsgLength !== groupMessages.length && setActive(ac => !ac);
      const unreadMsgs = groupMessages
        .filter(msg => {
          const read =
            msg.readBy && msg.readBy.find(usr => usr._id === currentUser?._id);
          if (read || msg.from._id === currentUser?._id) {
            return false;
          }
          return true;
        })
        .map(msg => msg._id);
      if (unreadMsgs && unreadMsgs.length !== 0) {
        props.updateGroupRead({
          messageIds: unreadMsgs as string[],
          readBy: currentUser!._id
        });
      }
    }
  }, [groupMessages ? groupMessages.length : groupMessages]);
  const sendGroupMessage = async (
    e: React.FormEvent<HTMLFormElement>,
    msg: string
  ): Promise<void> => {
    try {
      e.preventDefault();
      setInput("");
      const createdAt = new Date().toISOString();
      props.addGroupMessage({
        createdAt,
        from: currentUser as User,
        group: currentGroup as Group,
        message: msg
      });
      await axios.post("/api/new/group/message", {
        message: msg,
        group: currentGroup?._id,
        createdAt
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const renderTick = (grpMsg: GroupMsg) => {
    if (
      grpMsg.read &&
      grpMsg.readBy?.length === currentGroup!.participants.length - 1
    ) {
      return (
        <BsCheckAll
          size="17px"
          style={{ transform: "rotate(-10deg)" }}
          color="#4fc3f7"
        />
      );
    }
    if (grpMsg.read) {
      return (
        <BsCheckAll
          size="17px"
          style={{ transform: "rotate(-10deg)" }}
          color="rgba(0,0,0,.5)"
        />
      );
    }

    if (grpMsg._id) {
      return (
        <BsCheck
          size="17px"
          style={{ transform: "rotate(-10deg)" }}
          color="rgba(0,0,0,.5)"
        />
      );
    }
  };
  return (
    <div
      className={`${groupInfo && groupChat ? styles.groupInfo : ""} ${
        !groupChat ? styles.hide__container : ""
      } ${selectGroupMessages ? styles.selectGroupMessages : ""} ${
        groupSearch ? styles.groupSearch : ""
      } ${groupMessageInfo ? styles.groupMessageInfo : ""}`}
    >
      {groupMessageLoading && (
        <div className={styles.spinner}>
          <div className={`ui active centered inline loader`}></div>
          <p>fetching messages</p>
        </div>
      )}
      <div className={`${styles.container} ${showBox ? styles.showBox : ""}`}>
        <GroupChatHeader currentGroup={currentGroup} setShowBox={setShowBox} />
        <GroupBox setShowBox={setShowBox} />
        <div className={`${styles.body}`}>
          <GroupMessages
            active={active}
            setSelectedMessages={setSelectedMessages}
            currentUser={currentUser}
            groupMessages={groupMessages}
            grpScrollMsg={grpScrollMsg}
            renderTick={renderTick}
            selectGroupMessages={selectGroupMessages}
            selectedMessages={selectedMessages}
          />
          {!grpScrollMsg && (
            <React.Suspense fallback={<div></div>}>
              <ScrollIntoViewIfNeeded active={active}>
                <div></div>
              </ScrollIntoViewIfNeeded>
            </React.Suspense>
          )}
        </div>
        <form
          onSubmit={e =>
            input.trim().length !== 0 && sendGroupMessage(e, input)
          }
        >
          <div className={styles.input}>
            <input
              type="text"
              onChange={e => setInput(e.target.value)}
              value={input}
            />
            <button type="submit" className={styles.MdSend}>
              <MdSend size="20px" color="white" />
            </button>
          </div>
        </form>
        <div className={styles.select_box}>
          <div
            className={styles.cancel}
            onClick={() => {
              props.setSelectGroupMessages(false);
              setSelectedMessages([]);
            }}
          >
            <p>&nbsp;</p>
          </div>
          <div className={styles.selectedMessages}>
            <p>{selectedMessages.length} selected</p>
          </div>
          <div onClick={() => props.setGroupMsgInfo(true)}>
            <BsInfoCircleFill size="25px" color="rgba(80,80,80,.5)" />
          </div>
          <div>
            <AiFillStar size="25px" color="rgba(80,80,80,.5)" />
          </div>
          <div>
            <MdDelete size="25px" color="rgba(80,80,80,.5)" />
          </div>
          <div>
            <IoMdShareAlt size="25px" color="rgba(80,80,80,.5)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect<{}, Props>(null, dispatch =>
  bindActionCreators(
    {
      setSelectGroupMessages,
      setGroupDisplay,
      addGroupMessage,
      updateGroupRead,
      setGroupSearch,
      setGroupMsgInfo
    },
    dispatch
  )
)(GroupChat);
