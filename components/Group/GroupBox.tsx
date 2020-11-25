import React, { useEffect, useRef } from "react";
import styles from "../../styles/groupChat.module.css";

interface Props {
  setShowBox: React.Dispatch<React.SetStateAction<boolean>>;
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
      <div>
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

export default GroupBox;
