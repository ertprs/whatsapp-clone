import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiCheck, BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { User } from "../../interfaces/User";
import styles from "../../styles/forwardTo.module.css";

interface Props {
  contacts: User[];
}

const ForwardTo: React.FC<Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <div className={styles.outer_container}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_info}>
            <span>
              <p className={styles.cancel}>&nbsp;</p>
            </span>
            <p>Forward message to</p>
          </div>
          <div className={`${styles.input} ${focused ? styles.focused : ""}`}>
            <div className={styles.icons}>
              <BiSearchAlt size="20px" />
              <AiOutlineArrowLeft size="20px" color="#009688" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.chat_header}>
            <p>CHATS</p>
          </div>
          <div className={styles.contacts}>
            {props.contacts.map(ctx => (
              <div className={styles.contact} key={ctx._id}>
                <div>
                  <BiCheck size="25px" className={styles.check} color="white" />
                  <label htmlFor={ctx._id}></label>
                </div>
                <input type="checkbox" name={ctx._id} id={ctx._id} />
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div className={styles.name}>
                  <p>
                    {ctx.firstName} {ctx.lastName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForwardTo;
