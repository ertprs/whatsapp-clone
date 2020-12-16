import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Redux } from "../../interfaces/Redux";
import { SetPrompt, setPrompt } from "../../redux/actions";
import styles from "../../styles/prompt.module.css";

interface Props {
  setPrompt: (set: boolean) => SetPrompt;
}

const Propmt: React.FC<Props> = props => {
  const prompt = useSelector((state: Redux) => state.message.prompt);
  return (
    <div
      className={`${styles.container} ${prompt ? styles.container__show : ""}`}
    >
      <div className={styles.body}>
        <p>Delete chat with "kevin"?</p>
        <div className={styles.buttons}>
          <button onClick={() => props.setPrompt(false)}>cancel</button>
          <button onClick={() => props.setPrompt(false)}>delete</button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, dispatch =>
  bindActionCreators({ setPrompt }, dispatch)
)(Propmt);
