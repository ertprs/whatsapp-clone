import styles from "../../styles/chat.module.css";

import React, { useEffect, useRef, useState } from "react";
import { User } from "../../interfaces/User";
import {
  SetDisplay,
  setDisplay,
  ToggleContactInfo,
  toggleContactInfo
} from "../../redux/actions";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { connect } from "react-redux";
import { ImAttachment } from "react-icons/im";

interface Props {
  currentContact: User | null;
  setDisplay: (display: boolean) => SetDisplay;
  toggleContactInfo: (toggle: boolean) => ToggleContactInfo;
  showContactInfo: boolean;
}

const ChatHeader: React.FC<Props> = props => {
  const [clicked, setClicked] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (boxRef && boxRef.current && !boxRef.current.contains(e.target)) {
      setClicked(false);
    }
  };

  const renderUserInfo = (): JSX.Element => {
    if (props.currentContact?.typing) {
      return <p>Typing...</p>;
    }
    if (props.currentContact?.online) {
      return <p>Online</p>;
    }
    if (props.currentContact?.status) {
      return <p>{props.currentContact.status}</p>;
    }
    return <p></p>;
  };

  return (
    <div
      className={`${
        props.showContactInfo
          ? `${styles.contact_info} ${styles.contact_info_header}`
          : styles.chatHeader
      }`}
    >
      <div>
        <div
          className={styles.arrow_left}
          onClick={() => props.setDisplay(true)}
        >
          <HiOutlineArrowLeft size="30px" />
        </div>
        <img
          className={styles.profile_img}
          src="portitem1.jpeg"
          alt=""
          onClick={() => props.toggleContactInfo(true)}
        />
      </div>
      <div
        className={styles.userInfo}
        onClick={() => props.toggleContactInfo(true)}
      >
        <h1>
          {props.currentContact?.firstName} {props.currentContact?.lastName}
        </h1>
        {renderUserInfo()}
      </div>
      <div className={styles.chatIcons}>
        <ImAttachment size="20px" className={styles.ImAttachment} />
        <div
          className={`${styles.threeDots} ${
            clicked && !props.showContactInfo ? styles.dots_color : ""
          }`}
          onClick={() => setClicked(cl => !cl)}
        >
          <div className={styles.select_icon}></div>
          <div className={styles.select_icon}></div>
          <div className={styles.select_icon}></div>
        </div>
        {!props.showContactInfo && (
          <div
            className={`${styles.box} ${!clicked ? styles.hide_box : ""}`}
            ref={boxRef}
          >
            <p onClick={() => props.toggleContactInfo(true)}>Contact Info</p>
            <p>Select Messages</p>
            <p>Mute Notifications</p>
            <p>Delete Chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(null, { setDisplay, toggleContactInfo })(ChatHeader);
