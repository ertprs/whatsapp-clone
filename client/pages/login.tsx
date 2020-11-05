import React from "react";
import Link from "next/link";
import { withoutAuth } from "../HOCs/withoutAuth";
import styles from "../styles/login.module.css";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Input from "../components/input";

interface FormValues {
  email: string;
  password: string;
}

const login: React.FC<InjectedFormProps<FormValues>> = props => {
  return (
    <div className="container">
      <div className="parent_form login">
        <form className="form">
          <h1 className="login_h1">Login</h1>
          <Field
            component={Input}
            placeholder="Email"
            label="Email"
            name="email"
          />
          <Field
            component={Input}
            placeholder="Password"
            label="Password"
            name="password"
          />
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

// const validate=(formValues)=>{

// }

export default withoutAuth(
  reduxForm<FormValues>({ form: "login" })(login)
);
