import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
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
  const [firstNameFocused, setFirstNameFocused] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>("");
  const [lastNameFocused, setLastNameFocused] = useState<boolean>(false);
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
            <div
              className={`${styles.input} ${
                firstNameFocused ? styles.input_underline : ""
              }`}
            >
              <input
                type="text"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
                name="firstName"
                id="firstName"
                onFocus={() => setFirstNameFocused(true)}
                onBlur={() => setFirstNameFocused(false)}
              />
              <label htmlFor="firstName">
                <BsCheck
                  size="19px"
                  style={{ transform: "rotate(-10deg)" }}
                  color="rgba(0,0,0,.5)"
                  className={
                    firstNameFocused ? styles.BsCheck : styles.hideBsCheck
                  }
                />

                <RiPencilFill
                  color="rgba(0,0,0,.5)"
                  className={
                    !firstNameFocused
                      ? styles.RiPencilFill
                      : styles.hideRiPencilFill
                  }
                />
              </label>
            </div>
          </div>
          <div>
            <h6>Last Name</h6>
            <div
              className={`${styles.input} ${
                lastNameFocused ? styles.input_underline_last : ""
              }`}
            >
              <input
                type="text"
                onChange={e => setLastName(e.target.value)}
                value={lastName}
                name="lastName"
                id="lastName"
                onFocus={() => setLastNameFocused(true)}
                onBlur={() => setLastNameFocused(false)}
              />
              <label htmlFor="lastName">
                <BsCheck
                  size="19px"
                  style={{ transform: "rotate(-10deg)" }}
                  color="rgba(0,0,0,.5)"
                  className={
                    lastNameFocused
                      ? styles.BsCheck_last
                      : styles.hideBsCheck_last
                  }
                />

                <RiPencilFill
                  color="rgba(0,0,0,.5)"
                  className={
                    !lastNameFocused
                      ? styles.RiPencilFill_last
                      : styles.hideRiPencilFill_last
                  }
                />
              </label>
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
