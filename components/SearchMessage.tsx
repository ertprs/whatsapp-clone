import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import styles from "../styles/searchMessage.module.css";

const SearchMessage: React.FC = () => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div>
          <div
            className={
              focused ? styles.AiOutlineSearch__hidden : styles.AiOutlineSearch
            }
          >
            <AiOutlineSearch size="20px" color="rgb(80,80,80)" />
          </div>
          <div
            className={
              focused ? styles.AiOutlineArrowLeft : styles.AiOutlineArrowBottom
            }
          >
            <AiOutlineArrowLeft size="20px" color="#009688" />
          </div>
        </div>
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      <div className={styles.messages}>messages</div>
    </div>
  );
};

export default SearchMessage;
