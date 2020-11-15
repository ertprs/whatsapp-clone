import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { connect, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import { toggleProfile, ToggleProfile } from "../redux/actions";
import styles from "../styles/profile.module.css";

interface Props {
  toggleProfile: (toggle: boolean) => ToggleProfile;
}

const Profile: React.FC<Props> = props => {
  const showProfile = useSelector<Redux>(
    state => state.user.showProfile
  ) as Redux["user"]["showProfile"];
  const currentUser = useSelector<Redux>(
    state => state.user.currentUser
  ) as Redux["user"]["currentUser"];
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
            className={styles.img}
          />
        </div>
        <div className={styles.details}>
          <h6>Your Name</h6>
          <p>{currentUser?.firstName}</p>
        </div>
        <div className={styles.meta}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus, dolorum?
          </p>
        </div>
        <div className={styles.details}>
          <h6>About</h6>
          <p>{currentUser?.status}</p>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { toggleProfile })(Profile);
