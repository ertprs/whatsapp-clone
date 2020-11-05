import React from "react";
import { withoutAuth } from "../HOCs/withoutAuth";
import Link from "next/link";

const register = () => {
  return (
    <div className="container">
      <div className="parent_form">
        <form className="form">
          <h1>Register</h1>
          <div className="form_group">
            <input type="text" className="input" placeholder="First Name" />
            <label className="form_label" htmlFor="firstName">
              First name
            </label>
          </div>
          <div className="form_group">
            <input type="text" className="input" placeholder="Last Name" />{" "}
            <label className="form_label" htmlFor="lastName">
              Last name
            </label>
          </div>
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
          <div className="form_group">
            <input
              type="text"
              className="input"
              placeholder="Confirm Password"
            />{" "}
            <label className="form_label" htmlFor="confirmPassword">
              Confirm password
            </label>
          </div>
          <button className="btn">Register</button>
          <p>
            Already have an account?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default withoutAuth(register);
