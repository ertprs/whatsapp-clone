import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Redux } from "../../interfaces/Redux";
import { SetGroupInfo, setGroupInfo } from "../../redux/actions";
import styles from "../../styles/groupInfo.module.css";

interface Props {
  setGroupInfo: (set: boolean) => SetGroupInfo;
}
const GroupInfo: React.FC<Props> = props => {
  const groupInfo = useSelector((state: Redux) => state.group.groupInfo);
  return (
    <div className={!groupInfo ? styles.hideGroupInfo : ""}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div onClick={() => props.setGroupInfo(false)}>
            <span>&nbsp;</span>
          </div>
          <p>Group Info</p>
        </div>
        <div className={styles.body}>
          <div className={styles.group_header}>
            <img src="portitem1.jpeg" alt="pfp" />
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
            </div>
            <div>
              <p>Starred Messages</p>
            </div>
          </div>
          <div className={styles.participants}>
            <div>
              <h3>200 participants</h3>
            </div>
            <div>
              <div>
                <img src="portitem1.jpeg" alt="pfp" />
                <p>Kevin Mitaki</p>
              </div>
              <div>
                <img src="portitem1.jpeg" alt="pfp" />
                <p>Kevin Mitaki</p>
              </div>
              <div>
                <img src="portitem1.jpeg" alt="pfp" />
                <p>Kevin Mitaki</p>
              </div>
              <div>
                <img src="portitem1.jpeg" alt="pfp" />
                <p>Kevin Mitaki</p>
              </div>
              <div>
                <img src="portitem1.jpeg" alt="pfp" />
                <p>Kevin Mitaki</p>
              </div>
            </div>
          </div>

          <div className={styles.exit}>
            <p>Exit Group</p>
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
