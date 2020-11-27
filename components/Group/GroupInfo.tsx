import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoIosArrowForward, IoIosExit } from "react-icons/io";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Redux } from "../../interfaces/Redux";
import { SetGroupInfo, setGroupInfo } from "../../redux/actions";
import styles from "../../styles/groupInfo.module.css";

interface Props {
  setGroupInfo: (set: boolean) => SetGroupInfo;
}
const GroupInfo: React.FC<Props> = props => {
  const [checked, setChecked] = useState<boolean>(false);
  const groupInfo = useSelector((state: Redux) => state.group.groupInfo);
  const currentGroup = useSelector((state: Redux) => state.group.currentGroup);
  return (
    <div className={groupInfo ? styles.showGroupInfo : ""}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div onClick={() => props.setGroupInfo(false)}>
            <span>&nbsp;</span>
          </div>
          <p>Group Info</p>
        </div>
        <div className={`${styles.body} ${checked ? styles.checked : ""}`}>
          <div className={styles.group_header}>
            <img src="blank-profile-picture-973460_640.png" alt="pfp" />
            <div>
              <h1>Internet Hacks and VPNs</h1>
              <p>Created 12/12/2020 at 9:39AM</p>
            </div>
          </div>

          <div className={styles.description}>
            <h1>Description</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In
              beatae, sint esse aut ut corporis excepturi ad minus temporibus
              facere voluptatibus. Voluptate provident ea soluta quos minus
              distinctio necessitatibus ad?
            </p>
          </div>

          <div className={styles.group_actions}>
            <div>
              <p>Mute Notifications</p>
              <div>
                <div
                  className={styles.BiCheck}
                  onClick={() => setChecked(chkd => !chkd)}
                >
                  <BiCheck size="25px" className={styles.check} color="white" />
                  <label htmlFor="check">&nbsp;</label>
                </div>
                <input
                  type="checkbox"
                  id="check"
                  onChange={() => setChecked(chkd => !chkd)}
                  checked={checked}
                />
              </div>
            </div>
            <div>
              <p>Starred Messages</p>
              <div className={styles.IoIosArrowForward}>
                <IoIosArrowForward />
              </div>
            </div>
          </div>
          <div className={styles.participants}>
            <div className={styles.p_header}>
              <h3>{currentGroup?.participants.length} participants</h3>
            </div>
            <div>
              {currentGroup?.participants.map(user => (
                <div className={styles.participant} key={user._id}>
                  <img src="portitem1.jpeg" alt="pfp" />
                  <div>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.exit}>
            <div>
              <IoIosExit size="30px" />
              <p>Exit Group</p>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default connect<{}, Props>(null, dispatch =>
  bindActionCreators({ setGroupInfo }, dispatch)
)(GroupInfo);
