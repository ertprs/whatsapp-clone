import React, { useState } from "react";
import Link from "next/link";
import { withoutAuth } from "../HOCs/withoutAuth";
import styles from "../styles/login.module.css";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Input from "../components/Input";
import validator from "validator";
import { axios } from "../Axios";
import Router from "next/router";
import fetch from "isomorphic-unfetch";

interface FormValues {
  email: string;
  password: string;
}

const login: React.FC<InjectedFormProps<FormValues>> = props => {
  const [loading, setLoading] = useState<boolean>(false);
  const [request, setRequest] = useState<boolean>(false);
  const loginUser = async (formValues: FormValues): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.post("/api/login", formValues);
      console.log(res);
      Router.push("/");
      setLoading(false);
      setRequest(true);
    } catch (error) {
      setLoading(false);
      setRequest(false);
    }
  };
  return (
    <div className="container">
      <div className="parent_form login">
        <form
          className="form"
          onSubmit={props.handleSubmit((formValues: FormValues) => {
            loginUser(formValues);
          })}
        >
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
          <button
            className="btn"
            disabled={props.invalid || loading || request}
          >
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
