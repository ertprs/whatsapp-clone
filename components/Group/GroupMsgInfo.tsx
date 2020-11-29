import React from "react";
import { BsCheckAll } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import styles from "../../styles/groupMessageInfo.module.css";

const GroupMsgInfo = () => {
  const groupMessageInfo = useSelector(
    (state: Redux) => state.group.groupMessageInfo
  );
  return (
    <div className={groupMessageInfo ? styles.groupMessageInfo : ""}>
      <div className={styles.container}>
        <div className={styles.header}>Header</div>
        <div className={styles.body}>
          <div className={styles.message}></div>
          <div className={styles.info}>
            <div className={styles.readBy}>
              <div className={styles.readByHeader}>
                <p>Read by</p>
                <BsCheckAll
                  size="17px"
                  style={{ transform: "rotate(-10deg)" }}
                  color="#4fc3f7"
                />
              </div>
              <div className={styles.contact}>
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div>
                  <p>Kevin Mitaki</p>
                  <p>Yesterday at 11:25pm</p>
                </div>
              </div>
              <div className={styles.contact}>
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div>
                  <p>Kevin Mitaki</p>
                  <p>Yesterday at 11:25pm</p>
                </div>
              </div>
              <div className={styles.contact}>
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div>
                  <p>Kevin Mitaki</p>
                  <p>Yesterday at 11:25pm</p>
                </div>
              </div>
            </div>
            <div className={styles.deliveredTo}>
              <div className={styles.deliveredToHeader}>
                <p>Delivered to</p>
                <BsCheckAll
                  size="17px"
                  style={{ transform: "rotate(-10deg)" }}
                  color="rgba(0,0,0,.5)"
                />
              </div>
              <div className={styles.contact}>
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div>
                  <p>Kevin Mitaki</p>
                  <p>Yesterday at 11:25pm</p>
                </div>
              </div>
              <div className={styles.contact}>
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div>
                  <p>Kevin Mitaki</p>
                  <p>Yesterday at 11:25pm</p>
                </div>
              </div>
              <div className={styles.contact}>
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div>
                  <p>Kevin Mitaki</p>
                  <p>Yesterday at 11:25pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default GroupMsgInfo;
