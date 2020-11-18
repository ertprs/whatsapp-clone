import React from "react";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import styles from "../styles/searchMessage.module.css";

const SearchMessage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div>
          <div>
            <AiOutlineSearch size="20px" />
          </div>
          <div className={styles.AiOutlineArrowLeft}>
            <AiOutlineArrowLeft size="20px" />
          </div>
        </div>
        <input type="text" placeholder="Search..." />
      </div>
      <div className={styles.messages}>messages</div>
    </div>
  );
};

export default SearchMessage;
