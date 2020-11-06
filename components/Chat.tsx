import React, { useEffect } from "react";
import styles from "../styles/chat.module.css";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import Axios from "axios";
import { axios } from "../Axios";

const Chat = () => {
  // useEffect(() => {
  //   const fetchCurrentUser = async (): Promise<void> => {
  //     const res = await axios.get("/api/currentUser");
  //     console.log(res.data);
  //   };
  //   fetchCurrentUser();
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.userInfo}>
          <h1>John Doe</h1>
          <p>Typing...</p>
        </div>
        <div className={styles.chatIcons}>
          <ImAttachment size="20px" className={styles.ImAttachment} />
          <div>
            <div className={styles.select_icon}></div>
            <div className={styles.select_icon}></div>
            <div className={styles.select_icon}></div>
          </div>
        </div>
      </div>
      <div className={styles.message_start}></div>
      <div className={styles.input_container}>
        <input type="text" className={styles.input} />
        <div className={styles.MdSend}>
          <MdSend size="20px" />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="128px-Blue_double_ticks.svg.png"
            alt="tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.left_text}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit, natus!
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="check-mark-grey.svg.med.png"
            alt="grey-tick"
            className={styles.tick}
          />
        </div>
      </div>
      <div className={styles.right_text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          ullam.
        </p>
        <div className={styles.metadata}>
          <p>2:11</p>
          <img
            src="clipart1064340.png"
            alt="single-tick"
            className={styles.tick_rotate}
          />
        </div>
      </div>

      <div className={styles.message_start}></div>
    </div>
  );
};

export default Chat;
