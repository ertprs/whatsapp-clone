import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  FilterRecentChats,
  filterRecentChats,
  SetGroupContainer,
  setGroupContainer,
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
  setGroupContainer: (set: boolean) => SetGroupContainer;
}

const Header: React.FC<Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);
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
        <TiGroup size="30px" onClick={() => props.setGroupContainer(true)} />
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
        className={`${styles.profile_input} ${focused ? styles.search : ""} ${
          styles.fixed_input
        }`}
      >
        <div className={styles.BiSearchAlt__parent}>
          <BiSearchAlt
            className={focused ? styles.BiSearchAlt : styles.BiSearchAlt__hide}
          />
          <AiOutlineArrowLeft
            className={`${styles.AiOutlineArrowLeft} ${
              focused ? "" : styles.AiOutlineArrowLeft__turn
            }`}
            color="#009688"
          />
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
};

export default connect(null, dispatch =>
  bindActionCreators(
    { filterRecentChats, toggleProfile, setGroupContainer },
    dispatch
  )
)(Header);
