import React from "react";
import { connect, useSelector } from "react-redux";
import { IoIosArrowForward, IoMdThumbsDown } from "react-icons/io";
import { toggleContactInfo, ToggleContactInfo } from "../redux/actions";
import styles from "../styles/contactinfo.module.css";
import { MdDelete } from "react-icons/md";
import { BiBlock } from "react-icons/bi";
import { Redux } from "../interfaces/Redux";
import { formatRelative } from "date-fns";
import { bindActionCreators } from "redux";

interface Props {
  toggleContactInfo: (toggle: boolean) => ToggleContactInfo;
}

const ContactInfo: React.FC<Props> = props => {
  const currentContact = useSelector(
    (state: Redux) => state.user.currentContact
  );
  return (
    <div className={styles.container}>
      <div className={styles.contactinfo_header}>
        <p
          className={styles.rotate}
          onClick={() => props.toggleContactInfo(false)}
        >
          <span className={styles.x_1}>&nbsp;</span>
        </p>
        <p>Contact Info</p>
      </div>
      <div className={styles.profile_info}>
        <img
          src="blank-profile-picture-973460_640.png"
          alt="pfp"
          className={styles.profile_img}
        />
        <div>
          <h1>
            {currentContact?.firstName} {currentContact?.lastName}
          </h1>
          <p>
            {currentContact?.lastSeen
              ? `Last seen ${formatRelative(
                  new Date(currentContact.lastSeen),
                  Date.now()
                )}`
              : ""}
          </p>
        </div>
      </div>
      <div className={`${styles.action} ${styles.mld}`}>
        <div>
          <h3>Media Links and Docs</h3>
          <span>
            <IoIosArrowForward />
          </span>
        </div>
      </div>
      <div className={`${styles.noti} ${styles.action}`}>
        <span className={styles.mute}>
          <p>Mute Notifications</p>
          <span>&nbsp;</span>
        </span>

        <span className={styles.border}>&nbsp;</span>
        <span className={styles.icon}>
          <p>Starred Messages</p>
          <span>
            <IoIosArrowForward />
          </span>
        </span>
      </div>
      <div className={`${styles.noti} ${styles.action}`}>
        <p className={styles.a_e}>About and Email</p>
        <span className={styles.status}>{currentContact?.status}</span>
        <span className={styles.border}>&nbsp;</span>
        <p className={styles.email}>{currentContact?.email}</p>
      </div>
      <div className={styles.danger}>
        <div>
          <BiBlock color="rgb(80, 80, 80)" />
        </div>
        <p>Block</p>
      </div>
      <div className={styles.danger} style={{ color: "rgb(247, 3, 3)" }}>
        <div>
          <IoMdThumbsDown color="rgb(247, 3, 3)" />
        </div>
        <p>Report Contact</p>
      </div>
      <div className={styles.danger} style={{ color: "rgb(247, 3, 3)" }}>
        <div>
          <MdDelete color="rgb(247, 3, 3)" />
        </div>
        <p>Delete Chat</p>
      </div>
      <div className={styles.end}>&nbsp;</div>
    </div>
  );
};

export default connect<{}, Props>(null, dispatch =>
  bindActionCreators({ toggleContactInfo }, dispatch)
)(ContactInfo);
