import React from "react";
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
  return (
    <div className={!groupSearch ? styles.groupSearch__hide : ""}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p
              className={styles.cancel}
              onClick={() => props.setGroupSearch(false)}
            >
              <span>&nbsp;</span>
            </p>
            <p>Search Messages</p>
          </div>
          <input type="text" />
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
