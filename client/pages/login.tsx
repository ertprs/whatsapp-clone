import React from "react";
import Link from "next/link";
import { withoutAuth } from "../HOCs/withoutAuth";
import styles from "../styles/login.module.css";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Input from "../components/Input";
import validator from "validator";

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
            type="text"
            component={Input}
            placeholder="Email"
            label="Email"
            name="email"
          />
          <Field
            type="password"
            component={Input}
            placeholder="Password"
            label="Password"
            name="password"
          />
          <button className="btn" disabled={props.invalid}>
            Login
          </button>
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

const validate = (formValues: FormValues) => {
  const errors = {} as FormValues;
  if (
    !formValues.password ||
    (formValues.password && formValues.password.trim().length < 6)
  ) {
    errors.password = "Password must be six characters minimum";
  }
  if (
    !formValues.email ||
    (formValues.email && !validator.isEmail(formValues.email))
  ) {
    errors.email = "Please enter a valid email";
  }
  return errors;
};

export default withoutAuth(
  reduxForm<FormValues>({ form: "login", validate })(login)
);
