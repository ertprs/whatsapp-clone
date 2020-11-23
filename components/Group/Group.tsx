import React from "react";
import styles from "../../styles/group.module.css";

const Group = () => {
  return (
    <div className={styles.container}>
      <div>
        <p>Header</p>
        <input type="text" />
      </div>
      <div>
        <div>
          <img src="portitem1.jpeg" alt="pfp" />
          <div>
            <p>Kevin</p>
            <p>3 days ago</p>
          </div>
          <div>Lorem ipsum dolor sit</div>
        </div>
      </div>
    </div>
  );
};

export default Group;
