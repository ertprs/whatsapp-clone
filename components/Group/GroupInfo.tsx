import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoIosArrowForward, IoIosExit } from "react-icons/io";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axios } from "../../Axios";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import {
  AddCurrentContact,
  addCurrentContact,
  fetchMessages,
  SetDisplay,
  setDisplay,
  SetGroupChat,
  setGroupChat,
  SetGroupInfo,
  setGroupInfo,
  SetGroupMsgInfo,
  setGroupMsgInfo,
  SetGroupSearch,
  setGroupSearch,
  SetNewChat,
  setNewChat
} from "../../redux/actions";
import styles from "../../styles/groupInfo.module.css";

interface Props {
  setGroupInfo: (set: boolean) => SetGroupInfo;
  setNewChat: (set: boolean) => SetNewChat;
  addCurrentContact: (user: User) => AddCurrentContact;
  fetchMessages: (userId: string, count: number) => void;
  setDisplay: (set: boolean) => SetDisplay;
  setGroupChat: (set: boolean) => SetGroupChat;
  setGroupSearch: (set: boolean) => SetGroupSearch;
  setGroupMsgInfo: (set: boolean) => SetGroupMsgInfo;
}
const GroupInfo: React.FC<Props> = props => {
  const [checked, setChecked] = useState<boolean>(false);
  const groupInfo = useSelector((state: Redux) => state.group.groupInfo);
  const currentGroup = useSelector((state: Redux) => state.group.currentGroup);
  const grpMsgCount = useSelector((state: Redux) => state.group.grpMsgCount);
  const currentUser = useSelector((state: Redux) => state.user.currentUser);
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
                <div
                  className={styles.participant}
                  key={user._id}
                  onClick={async () => {
                    if (user._id !== currentUser?._id) {
                      const res = await axios.get<User>(
                        `/api/contact/${user._id}`
                      );
                      props.addCurrentContact(res.data);
                      props.setNewChat(false);
                      props.fetchMessages(user._id, grpMsgCount);
                      props.setDisplay(false);
                      props.setGroupChat(false);
                      props.setGroupInfo(false);
                      props.setGroupSearch(false);
                      props.setGroupMsgInfo(false);
                    }
                  }}
                >
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
          <div></div>
        </div>
      </div>
      ;
    </div>
  );
};

export default connect<{}, Props>(null, dispatch =>
  bindActionCreators(
    {
      setGroupInfo,
      setGroupChat,
      setDisplay,
      addCurrentContact,
      setNewChat,
      fetchMessages,
      setGroupSearch,
      setGroupMsgInfo
    },
    dispatch
  )
)(GroupInfo);
