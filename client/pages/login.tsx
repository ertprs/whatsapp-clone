import React from "react";
import styles from "../styles/login.module.css";

const login = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.form_group}>
          <input
            type="text"
            className={styles.input}
            placeholder="First Name"
          />
          <label className={styles.form_label} htmlFor="firstName">
            First name
          </label>
        </div>
        <div className={styles.form_group}>
          <input type="text" className={styles.input} placeholder="Last Name" />{" "}
          <label className={styles.form_label} htmlFor="lastName">
            Last name
          </label>
        </div>
        <div className={styles.form_group}>
          <input type="text" className={styles.input} placeholder="Email" />{" "}
          <label className={styles.form_label} htmlFor="email">
            Email
          </label>
        </div>
        <div className={styles.form_group}>
          <input type="text" className={styles.input} placeholder="Password" />{" "}
          <label className={styles.form_label} htmlFor="password">
            Password
          </label>
        </div>
        <div className={styles.form_group}>
          <input
            type="text"
            className={styles.input}
            placeholder="Confirm Password"
          />{" "}
          <label className={styles.form_label} htmlFor="confirmPassword">
            Confirm password
          </label>
        </div>
      </form>
    </div>
  );
};

export default login;
