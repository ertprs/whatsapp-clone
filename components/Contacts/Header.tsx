import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { connect } from "react-redux";
import {
  FilterRecentChats,
  filterRecentChats,
  toggleProfile,
  ToggleProfile
} from "../../redux/actions";
import styles from "../../styles/contacts.module.css";

interface Props {
  setNewChat: React.Dispatch<React.SetStateAction<boolean>>;
  setHideMenu: React.Dispatch<React.SetStateAction<boolean>>;
  hideMenu: boolean;
  filterRecentChats: (text: string) => FilterRecentChats;
  setHideIcon: React.Dispatch<React.SetStateAction<boolean>>;
  hideIcon: boolean;
  toggleProfile: (toggle: boolean) => ToggleProfile;
}

const Header: React.FC<Props> = props => {
  return (
    <div className={`${styles.profile} ${styles.fixed_2} ${styles.header}`}>
      <img
        className={styles.profile_header_img}
        src="portitem1.jpeg"
        alt=""
        onClick={() => props.toggleProfile(true)}
      />
      <div className={styles.header_icons}>
        <MdMessage
          size="30px"
          className={styles.MdMessage}
          onClick={() => props.setNewChat(chat => !chat)}
        />
        <div
          className={`${styles.icon_box} ${
            !props.hideMenu && styles.icon_box_color
          }`}
          onClick={() => props.setHideMenu(hide => !hide)}
        >
          <div className={styles.select_icon}></div>
          <div className={styles.select_icon}></div>
          <div className={styles.select_icon}></div>
        </div>
      </div>
      <div
        className={`${styles.profile_input} ${styles.search} ${styles.fixed_input}`}
      >
        <div className={styles.BiSearchAlt__parent}>
          <BiSearchAlt className={styles.BiSearchAlt} />
        </div>
        <input
          type="text"
          className={styles.input}
          placeholder="Search or start a new chat"
          onChange={e => {
            props.filterRecentChats(e.target.value);
            props.setHideIcon(true);
          }}
          onMouseLeave={() => props.setHideIcon(false)}
        />
      </div>
    </div>
  );
};

export default connect(null, { filterRecentChats, toggleProfile })(Header);
