import React from "react";
import { BsCheckAll } from "react-icons/bs";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Redux } from "../../interfaces/Redux";
import { SetGroupMsgInfo, setGroupMsgInfo } from "../../redux/actions";
import styles from "../../styles/groupMessageInfo.module.css";

interface Props {
  setGroupMsgInfo: (set: boolean) => SetGroupMsgInfo;
}

const GroupMsgInfo: React.FC<Props> = props => {
  const groupMessageInfo = useSelector(
    (state: Redux) => state.group.groupMessageInfo
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
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Numquam consequatur sapiente ea omnis magni inventore maiores,
                debitis amet odit aut at libero facilis cumque voluptate
                repudiandae iure excepturi maxime velit. Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Distinctio, illum
                consequuntur cum laudantium doloribus voluptatibus perspiciatis
                quos mollitia veniam necessitatibus vitae culpa porro beatae
                aliquid quod! Dolor accusantium alias nemo qui ratione id
                numquam rem veniam distinctio dolorum et nam quaerat provident,
                veritatis rerum dolorem enim, laborum ducimus hic itaque
                asperiores suscipit quo repellendus? Qui, ab? Totam ex eos nam
                odio, temporibus voluptatibus quia eum placeat? Culpa quo
                consectetur voluptates adipisci dolores recusandae distinctio,
                dicta cumque repudiandae tempora aliquam eveniet reprehenderit
                quam nam soluta quidem quis necessitatibus ipsam fugiat modi sed
                facere optio? Vero nobis porro doloribus nisi eligendi nemo!
              </p>
              <p>11:3pm</p>
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
