import React, { useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Redux } from "../../interfaces/Redux";
import {
  SetGroupInfo,
  setGroupInfo,
  SetGroupSearch,
  setGroupSearch,
  SetSelectGroupMessages,
  setSelectGroupMessages
} from "../../redux/actions";
import styles from "../../styles/groupChat.module.css";

interface Props {
  setShowBox: React.Dispatch<React.SetStateAction<boolean>>;
  setGroupInfo: (set: boolean) => SetGroupInfo;
  setSelectGroupMessages: (set: boolean) => SetSelectGroupMessages;
  setGroupSearch: (set: boolean) => SetGroupSearch;
}
const GroupBox: React.FC<Props> = props => {
  const boxRef = useRef<HTMLDivElement>(null);
  const groupInfo = useSelector((state: Redux) => state.group.groupInfo);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    groupInfo && props.setShowBox(false);
  }, [groupInfo]);
  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (boxRef.current && !boxRef.current.contains(e.target)) {
      props.setShowBox(false);
    }
  };
  return (
    <div className={styles.box} ref={boxRef}>
      <div
        onClick={() => {
          props.setGroupSearch(false);
          props.setGroupInfo(true);
        }}
      >
        <p>Group Info</p>
      </div>
      <div onClick={() => props.setSelectGroupMessages(true)}>
        <p>Select Messages</p>
      </div>
      <div>
        <p>Mute Notifications</p>
      </div>
      <div>
        <p>Exit Group</p>
      </div>
    </div>
  );
};

export default connect(null, dispatch =>
  bindActionCreators(
    { setGroupInfo, setSelectGroupMessages, setGroupSearch },
    dispatch
  )
)(GroupBox);
