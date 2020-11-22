import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { connect, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import { setNewGroup, SetNewGroup } from "../../redux/actions";
import styles from "../../styles/NewGroupContacts.module.css";

interface Props {
  setNewGroup: (set: boolean) => SetNewGroup;
}

const NewGroupContacts: React.FC<Props> = props => {
  const [input, setInput] = useState<string>("");
  const contacts = useSelector((state: Redux) => state.user.contacts);
  const newGroup = useSelector((state: Redux) => state.group.newGroup);
  return (
    <div className={newGroup ? styles.newGroup : ""}>
      <div className={styles.header}>
        <div className={styles.ctn_header}>
          <div onClick={() => props.setNewGroup(false)}>
            <AiOutlineArrowLeft size="20px" />
          </div>
          <p>Add Group Participants</p>
        </div>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Type contact name"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <span className={styles.input_border}>&nbsp;</span>
        </div>
      </div>
      <div className={styles.container}>
        <div>
          {contacts &&
            contacts.length !== 0 &&
            (contacts as User[])
              .filter(us => `${us.firstName}${us.lastName}`.includes(input))
              .map(user => (
                <div className={styles.contacts} key={user._id}>
                  <img
                    className={styles.profile_img}
                    src="portitem1.jpeg"
                    alt=""
                  />
                  <div className={styles.user}>
                    <div className={styles.user_header}>
                      <h2>
                        {user.firstName} {user.lastName}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default connect<{}, Props>(null, { setNewGroup })(NewGroupContacts);
