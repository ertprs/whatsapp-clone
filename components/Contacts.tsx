import React, { useState } from "react";
import styles from "../styles/contacts.module.css";
import { MdMessage } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";

const Main = () => {
  const [hideIcon, setHideIcon] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={`${styles.profile} ${styles.fixed}`}>
        {/* <div className={styles.fixed}> */}
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.header_icons}>
          <MdMessage size="30px" className={styles.MdMessage} />
          <div className={styles.icon_box}>
            <div className={styles.select_icon}></div>
            <div className={styles.select_icon}></div>
            <div className={styles.select_icon}></div>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className={`${styles.profile}`}></div>
      <div className={styles.profile}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search or start a new chat"
          onChange={() => setHideIcon(true)}
          onMouseLeave={() => setHideIcon(false)}
        />
        <BiSearchAlt
          className={`${styles.BiSearchAlt} ${hideIcon && styles.hide_icon}`}
        />
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src="portitem1.jpeg" alt="" />
        <div className={styles.user}>
          <div className={styles.user_header}>
            <h2>contact</h2>
            <p>2:11</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
            perferendis!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
