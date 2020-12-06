import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/starred.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

const Starred = () => {
  const [unstar, setUnstar] = useState<boolean>(false);
  const unstarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: Event) => {
    if (
      unstarRef &&
      unstarRef.current &&
      // @ts-ignore
      !unstarRef.current.contains(e.target)
    ) {
      setUnstar(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.FiArrowLeft}>
          <FiArrowLeft size="25px" />
        </div>
        <p>Starred Messages</p>
        <div className={styles.three_dots_prnt} onClick={() => setUnstar(true)}>
          <div className={styles.three_dots}></div>
          <div className={styles.three_dots}></div>
          <div className={styles.three_dots}></div>
          <div
            className={`${styles.unstar} ${unstar ? styles.unstar__show : ""}`}
            ref={unstarRef}
          >
            <p>Unstar All</p>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.message}>
          <div className={styles.msg_header}>
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.from_to}>
              <p>Kevin Mitaki</p>
              <p>Test 15</p>
            </div>
            <p className={styles.time}>9:54 AM</p>
          </div>
          <div className={styles.msg_body}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique odio dolor in, nesciunt officia dolores quaerat! Earum
              voluptatem fugiat ut aliquid fugit, sint blanditiis quibusdam
              accusantium minus et pariatur dignissimos?
            </p>
            <div className={styles.msg_time}>
              <AiFillStar />
              <p>10:30PM</p>
            </div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.msg_header}>
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.from_to}>
              <p>Kevin Mitaki</p>
              <p>Test 15</p>
            </div>
            <p className={styles.time}>9:54 AM</p>
          </div>
          <div className={styles.msg_body}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique odio dolor in, nesciunt officia dolores quaerat! Earum
              voluptatem fugiat ut aliquid fugit, sint blanditiis quibusdam
              accusantium minus et pariatur dignissimos?
            </p>
            <div className={styles.msg_time}>
              <AiFillStar />
              <p>10:30PM</p>
            </div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.msg_header}>
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.from_to}>
              <p>Kevin Mitaki</p>
              <p>Test 15</p>
            </div>
            <p className={styles.time}>9:54 AM</p>
          </div>
          <div className={styles.msg_body}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique odio dolor in, nesciunt officia dolores quaerat! Earum
              voluptatem fugiat ut aliquid fugit, sint blanditiis quibusdam
              accusantium minus et pariatur dignissimos?
            </p>
            <div className={styles.msg_time}>
              <AiFillStar />
              <p>10:30PM</p>
            </div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.msg_header}>
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.from_to}>
              <p>Kevin Mitaki</p>
              <p>Test 15</p>
            </div>
            <p className={styles.time}>9:54 AM</p>
          </div>
          <div className={styles.msg_body}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique odio dolor in, nesciunt officia dolores quaerat! Earum
              voluptatem fugiat ut aliquid fugit, sint blanditiis quibusdam
              accusantium minus et pariatur dignissimos?
            </p>
            <div className={styles.msg_time}>
              <AiFillStar />
              <p>10:30PM</p>
            </div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.msg_header}>
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.from_to}>
              <p>Kevin Mitaki</p>
              <p>Test 15</p>
            </div>
            <p className={styles.time}>9:54 AM</p>
          </div>
          <div className={styles.msg_body}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique odio dolor in, nesciunt officia dolores quaerat! Earum
              voluptatem fugiat ut aliquid fugit, sint blanditiis quibusdam
              accusantium minus et pariatur dignissimos?
            </p>
            <div className={styles.msg_time}>
              <AiFillStar />
              <p>10:30PM</p>
            </div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.msg_header}>
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.from_to}>
              <p>Kevin Mitaki</p>
              <p>Test 15</p>
            </div>
            <p className={styles.time}>9:54 AM</p>
          </div>
          <div className={styles.msg_body}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique odio dolor in, nesciunt officia dolores quaerat! Earum
              voluptatem fugiat ut aliquid fugit, sint blanditiis quibusdam
              accusantium minus et pariatur dignissimos?
            </p>
            <div className={styles.msg_time}>
              <AiFillStar />
              <p>10:30PM</p>
            </div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.msg_header}>
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.from_to}>
              <p>Kevin Mitaki</p>
              <p>Test 15</p>
            </div>
            <p className={styles.time}>9:54 AM</p>
          </div>
          <div className={styles.msg_body}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique odio dolor in, nesciunt officia dolores quaerat! Earum
              voluptatem fugiat ut aliquid fugit, sint blanditiis quibusdam
              accusantium minus et pariatur dignissimos?
            </p>
            <div className={styles.msg_time}>
              <AiFillStar />
              <p>10:30PM</p>
            </div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.msg_header}>
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.from_to}>
              <p>Kevin Mitaki</p>
              <p>Test 15</p>
            </div>
            <p className={styles.time}>9:54 AM</p>
          </div>
          <div className={styles.msg_body}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique odio dolor in, nesciunt officia dolores quaerat! Earum
              voluptatem fugiat ut aliquid fugit, sint blanditiis quibusdam
              accusantium minus et pariatur dignissimos?
            </p>
            <div className={styles.msg_time}>
              <AiFillStar />
              <p>10:30PM</p>
            </div>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.msg_header}>
            <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
            <div className={styles.from_to}>
              <p>Kevin Mitaki</p>
              <p>Test 15</p>
            </div>
            <p className={styles.time}>9:54 AM</p>
          </div>
          <div className={styles.msg_body}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique odio dolor in, nesciunt officia dolores quaerat! Earum
              voluptatem fugiat ut aliquid fugit, sint blanditiis quibusdam
              accusantium minus et pariatur dignissimos?
            </p>
            <div className={styles.msg_time}>
              <AiFillStar />
              <p>10:30PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Starred;
