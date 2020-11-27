import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Redux } from "../../interfaces/Redux";
import { SetGroupSearch, setGroupSearch } from "../../redux/actions";
import styles from "../../styles/groupSearch.module.css";

interface Props {
  setGroupSearch: (set: boolean) => SetGroupSearch;
}

const GroupSearch: React.FC<Props> = props => {
  const groupSearch = useSelector((state: Redux) => state.group.groupSearch);
  const [input, setInput] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <div className={!groupSearch ? styles.groupSearch__hide : ""}>
      <div className={`${styles.container} ${focused ? styles.focused : ""}`}>
        <div className={styles.header}>
          <div className={styles.sm_header}>
            <p
              className={styles.cancel}
              onClick={() => props.setGroupSearch(false)}
            >
              <span>&nbsp;</span>
            </p>
            <p>Search Messages</p>
          </div>
          <div className={styles.input}>
            <div className={styles.icons}>
              <AiOutlineSearch
                className={
                  focused
                    ? styles.AiOutlineSearch_rotate
                    : styles.AiOutlineSearch
                }
                size="20px"
                color="rgb(80,80,80)"
              />

              <AiOutlineArrowLeft
                className={
                  focused
                    ? styles.AiOutlineArrowLeft
                    : styles.AiOutlineArrowLeft_rotate
                }
                size="20px"
                color="#009688"
              />
            </div>
            <input
              type="text"
              onChange={e => setInput(e.target.value)}
              value={input}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
          <div className={styles.message}>
            <p>9 Minutes</p>
            <div>
              <BsCheck
                size="17px"
                style={{ transform: "rotate(-10deg)" }}
                color="rgba(0,0,0,.5)"
              />
              <p>wassup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, dispatch =>
  bindActionCreators({ setGroupSearch }, dispatch)
)(GroupSearch);
