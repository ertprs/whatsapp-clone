import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { BsCheckAll } from "react-icons/bs";
import { connect } from "react-redux";
import { toggleSearchMessage, ToggleSearchMessage } from "../redux/actions";
import styles from "../styles/searchMessage.module.css";

interface Props {
  toggleSearchMessage: (toggle: boolean) => ToggleSearchMessage;
}

const SearchMessage: React.FC<Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p onClick={() => props.toggleSearchMessage(false)}>
          <span>&nbsp;</span>
        </p>
        <p>Search Messages</p>
      </div>
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
      <div className={styles.messages}>
        <div>
          <div>2:44pm</div>
          <div>
            <div>
              <BsCheckAll size="15px" color="rgb(80,80,80)" />
            </div>
            <p className={styles.message}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              rerum, neque, voluptate nostrum praesentium minus atque labore
              quasi quidem exercitationem distinctio aperiam recusandae tempore
              commodi odit? Deleniti, nostrum! Totam, neque.
            </p>
          </div>
        </div>
        <div>
          <div>2:44pm</div>
          <div>
            <div>
              <BsCheckAll size="15px" color="rgb(80,80,80)" />
            </div>
            <p className={styles.message}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              rerum, neque, voluptate nostrum praesentium minus atque labore
              quasi quidem exercitationem distinctio aperiam recusandae tempore
              commodi odit? Deleniti, nostrum! Totam, neque.
            </p>
          </div>
        </div>
        <div>
          <div>2:44pm</div>
          <div>
            <div>
              <BsCheckAll size="15px" color="rgb(80,80,80)" />
            </div>
            <p className={styles.message}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              rerum, neque, voluptate nostrum praesentium minus atque labore
              quasi quidem exercitationem distinctio aperiam recusandae tempore
              commodi odit? Deleniti, nostrum! Totam, neque.
            </p>
          </div>
        </div>
        <div>
          <div>2:44pm</div>
          <div>
            <div>
              <BsCheckAll size="15px" color="rgb(80,80,80)" />
            </div>
            <p className={styles.message}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              rerum, neque, voluptate nostrum praesentium minus atque labore
              quasi quidem exercitationem distinctio aperiam recusandae tempore
              commodi odit? Deleniti, nostrum! Totam, neque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect<{}, Props>(null, { toggleSearchMessage })(SearchMessage);
