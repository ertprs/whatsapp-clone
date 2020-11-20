import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { RiPencilFill } from "react-icons/ri";
import { useSelector, connect } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { toggleProfile, ToggleProfile } from "../../redux/actions";
import styles from "../../styles/profile.module.css";

interface Props {
  toggleProfile: (toggle: boolean) => ToggleProfile;
}

const Profile: React.FC<Props> = props => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const showProfile = useSelector<Redux>(
    state => state.user.showProfile
  ) as Redux["user"]["showProfile"];
  const currentUser = useSelector<Redux>(
    state => state.user.currentUser
  ) as Redux["user"]["currentUser"];
  useEffect(() => {
    setFirstName(currentUser!.firstName);
    setLastName(currentUser!.lastName);
  }, []);
  return (
    <div className={`${showProfile ? styles.shown : ""}`}>
      <div className={`${styles.container} `}>
        <div onClick={() => props.toggleProfile(false)} className={styles.icon}>
          <div>
            <HiOutlineArrowLeft size="30px" />
          </div>
          <p>profile</p>
        </div>
        <div className={styles.photo}>
          <img
            src="blank-profile-picture-973460_640.png"
            alt="pfp"
            className={`${styles.img} ${showProfile && styles.img_animate}`}
          />
        </div>
        <div
          className={`${styles.details} ${showProfile && styles.animate} ${
            styles.name_info
          }`}
        >
          <div>
            <h6>First Name</h6>
            <div className={styles.input}>
              <input
                type="text"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
                name="firstName"
              />
              <span>
                <RiPencilFill />
              </span>
            </div>
          </div>
          <div>
            <h6>Last Name</h6>
            <div className={styles.input}>
              <input
                type="text"
                onChange={e => setLastName(e.target.value)}
                value={lastName}
                name="lastName"
              />
              <span>
                <RiPencilFill />
              </span>
            </div>
          </div>
        </div>
        <div className={`${styles.meta} ${showProfile && styles.animate}`}>
          <p style={{ color: "rgba(0,0,0,.5)", fontSize: "1.3rem" }}>
            This name will be visible to your WhatsApp contacts
          </p>
        </div>
        <div className={`${styles.details} ${showProfile && styles.animate}`}>
          <h6>About</h6>
          <p>{currentUser?.status}</p>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { toggleProfile })(Profile);
