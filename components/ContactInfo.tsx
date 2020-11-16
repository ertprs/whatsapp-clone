import React from "react";
import { connect } from "react-redux";
import { IoMdThumbsDown } from "react-icons/io";
import { toggleContactInfo, ToggleContactInfo } from "../redux/actions";
import styles from "../styles/contactinfo.module.css";
import { MdDelete } from "react-icons/md";
import { BiBlock } from "react-icons/bi";

interface Props {
  toggleContactInfo: (toggle: boolean) => ToggleContactInfo;
}

const ContactInfo: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.contactinfo_header}>
        <p
          className={styles.rotate}
          onClick={() => props.toggleContactInfo(false)}
        >
          <span className={styles.x_1}>&nbsp;</span>
          <span className={styles.x_2}>&nbsp; </span>
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
          <h1>Kevin</h1>
          <p>Last Seen Friday at 10:13pm</p>
        </div>
      </div>
      <div>
        <h3>Media Links and Docs</h3>
      </div>
      <div>
        <p>Mute Notifications</p>
        <p>Starred Messages</p>
      </div>
      <div>
        <p>About and Phone Number</p>
        <p>&nbsp;</p>
        <p>+254712345678</p>
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

export default connect<{}, Props>(null, { toggleContactInfo })(ContactInfo);
