import React, { useState } from "react";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete, MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import styles from "../../styles/groupChat.module.css";
import GroupBox from "./GroupBox";

const GroupChat = () => {
  const [showBox, setShowBox] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const groupInfo = useSelector((state: Redux) => state.group.groupInfo);
  const groupChat = useSelector((state: Redux) => state.group.groupChat);
  const currentGroup = useSelector((state: Redux) => state.group.currentGroup);
  return (
    <div
      className={`${groupInfo && groupChat ? styles.groupInfo : ""} ${
        !groupChat ? styles.hide__container : ""
      }`}
    >
      <div className={`${styles.container} ${showBox ? styles.showBox : ""}`}>
        <div className={styles.header}>
          <div className={styles.user_info}>
            <img src="portitem1.jpeg" alt="pfp" />
            <div>
              <h1>{currentGroup?.name}</h1>
              <div className={styles.participants}>
                {currentGroup?.participants.map(grp => (
                  <span key={grp._id}>
                    {grp.firstName} {grp.lastName}
                    {currentGroup.participants[
                      currentGroup.participants.length - 1
                    ]._id !== grp._id
                      ? ", "
                      : " "}
                  </span>
                ))}
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
        <div className={`${styles.body} ${checked ? styles.checked : ""}`}>
          <div className={styles.right_text}>
            <div>
              <div
                className={styles.BiCheck}
                onClick={() => setChecked(chkd => !chkd)}
              >
                <BiCheck size="25px" className={styles.check} color="white" />
                <label className={styles.check_label} htmlFor="right_text">
                  &nbsp;
                </label>
              </div>
              <input
                type="checkbox"
                id="right_text"
                name="right_text"
                checked={checked}
              />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
              repellat earum. Illo eligendi ipsa aperiam facere accusantium?
              Esse sed suscipit provident ipsa nostrum veritatis officia qui
              velit. Nesciunt, assumenda qui?
            </p>
          </div>
          <div className={styles.left_text}>
            {" "}
            <div>
              {" "}
              <div
                className={styles.BiCheck}
                onClick={() => setChecked(chkd => !chkd)}
              >
                <BiCheck size="25px" className={styles.check} color="white" />
                <label className={styles.check_label} htmlFor="left_text">
                  &nbsp;
                </label>
              </div>
              <input
                type="checkbox"
                id="left_text"
                name="left_text"
                checked={checked}
              />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
              repellat earum. Illo eligendi ipsa aperiam facere accusantium?
              Esse sed suscipit provident ipsa nostrum veritatis officia qui
              velit. Nesciunt, assumenda qui?
            </p>
          </div>
        </div>
        <div className={styles.input}>
          <input type="text" />
          <div className={styles.MdSend}>
            <MdSend size="20px" color="white" />
          </div>
        </div>
        <div className={styles.select_box}>
          <div className={styles.cancel}>
            <p>&nbsp;</p>
          </div>
          <div>
            <p>5 selected</p>
          </div>
          <div>
            <BsInfoCircleFill size="25px" color="rgba(80,80,80,.5)" />
          </div>
          <div>
            <AiFillStar size="25px" color="rgba(80,80,80,.5)" />
          </div>
          <div>
            <MdDelete size="25px" color="rgba(80,80,80,.5)" />
          </div>
          <div>
            <IoMdShareAlt size="25px" color="rgba(80,80,80,.5)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
