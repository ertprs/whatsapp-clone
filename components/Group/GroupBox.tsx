import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SetGroupInfo, setGroupInfo } from "../../redux/actions";
import styles from "../../styles/groupChat.module.css";

interface Props {
  setShowBox: React.Dispatch<React.SetStateAction<boolean>>;
  setGroupInfo: (set: boolean) => SetGroupInfo;
}
const GroupBox: React.FC<Props> = props => {
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (boxRef.current && !boxRef.current.contains(e.target)) {
      props.setShowBox(false);
    }
  };
  return (
    <div className={styles.box} ref={boxRef}>
      <div onClick={() => props.setGroupInfo(true)}>
        <p>Group Info</p>
      </div>
      <div>
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
  bindActionCreators({ setGroupInfo }, dispatch)
)(GroupBox);
