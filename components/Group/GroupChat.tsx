import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import styles from "../../styles/groupChat.module.css";
import GroupBox from "./GroupBox";

const GroupChat = () => {
  const [showBox, setShowBox] = useState<boolean>(false);
  return (
    <div className={`${styles.container} ${showBox ? styles.showBox : ""}`}>
      <div className={styles.header}>
        <div className={styles.user_info}>
          <img src="portitem1.jpeg" alt="pfp" />
          <div>
            <h1>Internet hacks and VPNs</h1>
            <div className={styles.participants}>
              <span>Kevin Mitaki</span> <span>Kevin Mitaki</span>{" "}
              <span>Kevin Mitaki</span> <span>Kevin Mitaki</span>{" "}
              <span>Kevin Mitaki</span> <span>Kevin Mitaki</span>{" "}
              <span>Kevin Mitaki</span> <span>Kevin Mitaki</span>{" "}
              <span>Kevin Mitaki</span> <span>Kevin Mitaki</span>{" "}
              <span>Kevin Mitaki</span> <span>Kevin Mitaki</span>{" "}
              <span>Kevin Mitaki</span> <span>Kevin Mitaki</span>{" "}
              <span>Kevin Mitaki</span> <span>Kevin Mitaki</span>{" "}
              <span>Kevin Mitaki</span> <span>Kevin Mitaki</span>{" "}
              <span>Kevin Mitaki</span>{" "}
            </div>
          </div>
        </div>
        <div className={styles.header_icons}>
          <div>
            <AiOutlineSearch size="20px" />
          </div>
          <div
            onClick={() => setShowBox(show => !show)}
            className={styles.three_dots}
          >
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </div>
        </div>
      </div>
      <GroupBox setShowBox={setShowBox} />
      <div className={styles.body}>
        <div className={styles.right_text}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
            repellat earum. Illo eligendi ipsa aperiam facere accusantium? Esse
            sed suscipit provident ipsa nostrum veritatis officia qui velit.
            Nesciunt, assumenda qui?
          </p>
        </div>
        <div className={styles.left_text}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
            repellat earum. Illo eligendi ipsa aperiam facere accusantium? Esse
            sed suscipit provident ipsa nostrum veritatis officia qui velit.
            Nesciunt, assumenda qui?
          </p>
        </div>
      </div>
      <div className={styles.input}>
        <input type="text" />
        <div className={styles.MdSend}>
          <MdSend size="20px" color="white" />
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
