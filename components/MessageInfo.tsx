import React from "react";
import { BsCheckAll } from "react-icons/bs";
import styles from "../styles/messageInfo.module.css";

const MessageInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        porro eveniet nobis fugiat quasi neque sequi consequuntur, voluptas id
        dignissimos, deleniti accusamus magnam autem repellendus quos eius sed
        nemo cum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
        corrupti quis dolore nulla fugiat adipisci, libero odio minus molestiae
        esse deserunt provident impedit ex possimus facere, doloribus eos atque
        voluptatem nam laboriosam explicabo sequi commodi! Earum voluptas, quo
        delectus accusantium, a ab soluta numquam adipisci repellat magnam
        possimus quia eius voluptatum laboriosam hic eveniet temporibus
        exercitationem harum quos consequuntur vitae nulla voluptatibus veniam
        libero. Error officia eligendi odit repellendus in similique doloribus
        optio, distinctio tenetur minus enim porro, unde vitae maxime
        consectetur eveniet autem laboriosam dolore obcaecati laborum nam
        voluptate. Possimus unde nostrum, suscipit provident, debitis
        consectetur, a ullam consequatur quam dolor eligendi blanditiis?
        Quisquam harum eligendi facere accusantium facilis dolores corrupti
        ullam nam magni tempore esse nulla labore maiores quae hic sapiente quis
        placeat sequi expedita, similique exercitationem provident est? Earum
        quasi eligendi dolores amet modi voluptatibus rerum veritatis autem est
        totam, omnis distinctio accusamus dolorem adipisci ullam atque laborum
        rem incidunt. Amet officia vero, iure dolorem quaerat nostrum aliquam
        veniam impedit. Ex totam vitae necessitatibus. Maxime, illo quis! Eius
        repudiandae corporis a dignissimos quaerat quae aspernatur dolorum neque
        autem consequuntur possimus totam voluptas necessitatibus fuga,
        voluptatum odio, eveniet consequatur facere. Porro similique accusamus
        earum atque odit distinctio vel.
      </div>
      <div className={styles.message_info}>
        <div>
          <p>
            <span>
              <BsCheckAll
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="#4fc3f7"
              />
            </span>
            <span>Read</span>
          </p>
          <p className={styles.time}>Yesterday at 7:30pm</p>
        </div>
        <div>
          <p>
            <span>
              <BsCheckAll
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgb(80,80,80)"
              />
            </span>
            <span>Delivered</span>
          </p>
          <p className={styles.time}>Yesterday at 7:30pm</p>
        </div>
      </div>
    </div>
  );
};

export default MessageInfo;
