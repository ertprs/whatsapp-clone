import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import styles from "../../styles/groupChat.module.css";

const GroupChat = () => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.user_info}>
          <img src="portitem1.jpeg" alt="pfp" />
          <h3>Kevin Mitaki</h3>
          <p>Last seen Friday at 5:29pm</p>
        </div>
        <div className={styles.header_icons}>
          <div>
            <AiOutlineSearch />
          </div>
          <span>&nbsp;</span>
        </div>
      </div>
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
        <MdSend />
      </div>
    </div>
  );
};

export default GroupChat;
