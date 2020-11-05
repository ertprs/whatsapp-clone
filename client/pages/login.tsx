import React from "react";
import { withoutAuth } from "../HOCs/withoutAuth";
import styles from "../styles/login.module.css";

const login = () => {
  return (
    <div className="container">
      <div className="parent_form">
        <form className="form">
          <div className="form_group">
            <input type="text" className="input" placeholder="Email" />{" "}
            <label className="form_label" htmlFor="email">
              Email
            </label>
          </div>
          <div className="form_group">
            <input type="text" className="input" placeholder="Password" />{" "}
            <label className="form_label" htmlFor="password">
              Password
            </label>
            <button className="btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withoutAuth(login);
