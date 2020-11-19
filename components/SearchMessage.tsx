import { formatDistance } from "date-fns";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { BsCheckAll } from "react-icons/bs";
import { connect, useSelector } from "react-redux";
import { Message } from "../interfaces/Message";
import { Redux } from "../interfaces/Redux";
import { toggleSearchMessage, ToggleSearchMessage } from "../redux/actions";
import styles from "../styles/searchMessage.module.css";

interface Props {
  toggleSearchMessage: (toggle: boolean) => ToggleSearchMessage;
}

const SearchMessage: React.FC<Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  // const [messages,setMessages]=useState<Message[]|[]>([])
  const showSearchMessage = useSelector(
    (state: Redux) => state.message.showSearchMessage
  ) as Redux["message"]["showSearchMessage"];
  const reduxMessages = useSelector(
    (state: Redux) => state.message.messages
  ) as Redux["message"]["messages"];

  //   useEffect(()=>{
  // setMessages(reduxMessages as Message[]|[])
  //   },[])
  return (
    <div className={showSearchMessage ? styles.showSearchMessage : ""}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p onClick={() => props.toggleSearchMessage(false)}>
            <span>&nbsp;</span>
          </p>
          <p>Search Messages</p>
        </div>
        <div
          className={`${styles.search} ${focused ? styles.search__white : ""}`}
        >
          <div>
            <div
              className={
                focused
                  ? styles.AiOutlineSearch__hidden
                  : styles.AiOutlineSearch
              }
            >
              <AiOutlineSearch size="20px" color="rgb(80,80,80)" />
            </div>
            <div
              className={
                focused
                  ? styles.AiOutlineArrowLeft
                  : styles.AiOutlineArrowBottom
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
            onChange={e => setInput(e.target.value)}
            value={input}
          />
        </div>
        <div className={styles.messages}>
          {reduxMessages?.length !== 0 &&
            (reduxMessages as Message[]).map(msg => (
              <div className={styles.message}>
                <div>{formatDistance(new Date(msg.createdAt), Date.now())}</div>
                <div className={styles.content}>
                  <div>
                    <BsCheckAll size="15px" color="rgb(80,80,80)" />
                  </div>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default connect<{}, Props>(null, { toggleSearchMessage })(SearchMessage);
