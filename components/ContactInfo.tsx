import React from "react";
import styles from "../styles/contactinfo.module.css";

const ContactInfo = () => {
  return (
    <div className={styles.container}>
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
        <p>+254712345678</p>
      </div>
      <div>
        <p>Block</p>
      </div>
      <div>
        <p>Report Contact</p>
      </div>
      <div>
        <p>Delete Chat</p>
      </div>
    </div>
  );
};

export default ContactInfo;
