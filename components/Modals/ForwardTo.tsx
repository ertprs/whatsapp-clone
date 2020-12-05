import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiCheck, BiSearchAlt } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import { User } from "../../interfaces/User";
import styles from "../../styles/forwardTo.module.css";

interface Props {
  contacts: User[];
}

const ForwardTo: React.FC<Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const filtered = props.contacts.filter(ctx => selected.includes(ctx._id));
  return (
    <div className={styles.outer_container}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_info}>
            <span>
              <p className={styles.cancel}>&nbsp;</p>
            </span>
            <p>Forward message to</p>
          </div>
          <div className={`${styles.input} ${focused ? styles.focused : ""}`}>
            <div className={styles.icons}>
              <BiSearchAlt size="20px" />
              <AiOutlineArrowLeft size="20px" color="#009688" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.chat_header}>
            <p>CHATS</p>
          </div>
          <div className={styles.contacts}>
            {props.contacts.map(ctx => (
              <div
                className={`${styles.contact}`}
                key={ctx._id}
                onClick={() => {
                  if (selected) {
                    const idx = selected.indexOf(ctx._id);
                    const ids = [...selected];
                    if (idx !== -1) {
                      ids.splice(idx, 1);
                      setSelected(ids);
                    } else {
                      setSelected([ctx._id, ...selected]);
                    }
                  }
                }}
              >
                <div
                  className={`${styles.contact_div} ${
                    selected && selected.includes(ctx._id)
                      ? styles.selected
                      : ""
                  }`}
                >
                  <BiCheck size="25px" className={styles.check} />
                  <label htmlFor={ctx._id}></label>
                </div>
                <input
                  type="checkbox"
                  name={ctx._id}
                  id={ctx._id}
                  onChange={() => {
                    if (selected) {
                      const idx = selected.indexOf(ctx._id);
                      const ids = [...selected];
                      if (idx !== -1) {
                        ids.splice(idx, 1);
                        setSelected(ids);
                      } else {
                        setSelected([ctx._id, ...selected]);
                      }
                    }
                  }}
                  checked={selected ? selected.includes(ctx._id) : false}
                />
                <img
                  className={styles.profile_img}
                  src="portitem1.jpeg"
                  alt=""
                />
                <div className={styles.name}>
                  <p>
                    {ctx.firstName} {ctx.lastName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.selected_names}>
            {filtered.length !== 0 &&
              filtered.map(ctx =>
                filtered[filtered.length - 1]._id !== ctx._id ? (
                  <span>
                    {ctx.firstName} {ctx.lastName}
                    {", "}
                  </span>
                ) : (
                  <span>
                    {ctx.firstName} {ctx.lastName}
                  </span>
                )
              )}
          </div>
          <div className={styles.MdSend}>
            <MdSend size="20px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForwardTo;
