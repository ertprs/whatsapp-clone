import styles from "../../styles/contacts.module.css";
import React from "react";

interface Props {
  menuRef: React.RefObject<HTMLDivElement>;
  hideMenu: boolean;
}

const Box: React.FC<Props> = props => {
  return (
    <div className={`${styles.profile}`}>
      <div
        ref={props.menuRef}
        className={`${styles.box} ${props.hideMenu && styles.hideMenu}`}
      >
        <div>
          <p>New Group</p>
        </div>
        <div>
          <p>Profile</p>
        </div>
        <div>
          <p>box</p>
        </div>
        <div>
          <p>box</p>
        </div>
        <div>
          <p>box</p>
        </div>
        <div>
          <p>box</p>
        </div>
      </div>
    </div>
  );
};

export default Box;
