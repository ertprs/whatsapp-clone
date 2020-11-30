import { formatRelative } from "date-fns";
import React from "react";
import { BsCheckAll } from "react-icons/bs";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Redux } from "../../interfaces/Redux";
import { SetGroupMsgInfo, setGroupMsgInfo } from "../../redux/actions";
import styles from "../../styles/groupMessageInfo.module.css";
import { formatDistance } from "date-fns";

interface Props {
  setGroupMsgInfo: (set: boolean) => SetGroupMsgInfo;
}

const GroupMsgInfo: React.FC<Props> = props => {
  const groupMessageInfo = useSelector(
    (state: Redux) => state.group.groupMessageInfo
  );
  const selectedInfoMsg = useSelector(
    (state: Redux) => state.group.selectedInfoMsg
  );
  return (
    <div className={groupMessageInfo ? styles.groupMessageInfo : ""}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div
            className={styles.cancel}
            onClick={() => props.setGroupMsgInfo(false)}
          >
            <p>&nbsp;</p>
          </div>
          <p>Message Info</p>
        </div>
        <div className={styles.body}>
          <div className={styles.message}>
            <div>
              <p>{selectedInfoMsg?.message}</p>
              <p>
                {formatDistance(
                  new Date(selectedInfoMsg!.createdAt),
                  Date.now()
                )}
              </p>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.readByHeader}>
              <p>Read by</p>
              <BsCheckAll
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="#4fc3f7"
              />
            </div>
            <div className={styles.readBy}>
              {selectedInfoMsg!.readBy &&
                selectedInfoMsg?.readBy.length !== 0 &&
                selectedInfoMsg?.readBy.map(ctx => (
                  <div className={styles.contact}>
                    <img
                      className={styles.profile_img}
                      src="portitem1.jpeg"
                      alt=""
                    />
                    <div>
                      <p className={styles.name}>
                        {ctx.firstName} {ctx.lastName}
                      </p>
                      <p className={styles.date}>
                        {formatRelative(new Date(ctx.readDate), Date.now())}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.deliveredToHeader}>
              <p>Delivered to</p>
              <BsCheckAll
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
            </div>
            <div className={styles.deliveredTo}>
              <div className={styles.contact}>
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div>
                  <p className={styles.name}>
                    Kevin Mitaki Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quaerat, dolores? Inventore nobis iusto
                    nisi, architecto aliquid sapiente dolores excepturi atque
                    eos deleniti modi odio maxime exercitationem, quasi
                    consectetur ducimus voluptate. Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Odit similique corrupti
                    accusantium obcaecati voluptates provident officia commodi
                    dolor pariatur impedit reprehenderit nostrum, facere ut
                    ducimus repellendus, nihil recusandae cupiditate ea?
                  </p>
                  <p className={styles.date}>Yesterday at 11:25pm</p>
                </div>
              </div>
              <div className={styles.contact}>
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div>
                  <p className={styles.name}>
                    Kevin Mitaki Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quaerat, dolores? Inventore nobis iusto
                    nisi, architecto aliquid sapiente dolores excepturi atque
                    eos deleniti modi odio maxime exercitationem, quasi
                    consectetur ducimus voluptate. Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Odit similique corrupti
                    accusantium obcaecati voluptates provident officia commodi
                    dolor pariatur impedit reprehenderit nostrum, facere ut
                    ducimus repellendus, nihil recusandae cupiditate ea?
                  </p>
                  <p className={styles.date}>Yesterday at 11:25pm</p>
                </div>
              </div>
              <div className={styles.contact}>
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div>
                  <p className={styles.name}>
                    Kevin Mitaki Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quaerat, dolores? Inventore nobis iusto
                    nisi, architecto aliquid sapiente dolores excepturi atque
                    eos deleniti modi odio maxime exercitationem, quasi
                    consectetur ducimus voluptate. Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Odit similique corrupti
                    accusantium obcaecati voluptates provident officia commodi
                    dolor pariatur impedit reprehenderit nostrum, facere ut
                    ducimus repellendus, nihil recusandae cupiditate ea?
                  </p>
                  <p className={styles.date}>Yesterday at 11:25pm</p>
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

export default connect<{}, Props>(null, dispatch =>
  bindActionCreators({ setGroupMsgInfo }, dispatch)
)(GroupMsgInfo);
