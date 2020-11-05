import React from "react";
import Link from "next/link";
import { withoutAuth } from "../HOCs/withoutAuth";
import styles from "../styles/login.module.css";

const login = () => {
  return (
    <div className="container">
      <div className="parent_form login">
        <form className="form">
          <h1 className="login_h1">Login</h1>
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
          </div>
          <button className="btn">Login</button>
          <p>
            Don't have an account?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default withoutAuth(login);
