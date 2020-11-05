import React from "react";
import { withoutAuth } from "../HOCs/withoutAuth";
import Link from "next/link";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Input from "../components/input";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const register: React.FC<InjectedFormProps<FormValues>> = props => {
  console.log(props.invalid);
  return (
    <div className="container">
      <div className="parent_form">
        <form className="form">
          <h1>Register</h1>
          <Field
            component={Input}
            placeholder="First Name"
            label="First Name"
            name="firstName"
          />
          <Field
            component={Input}
            placeholder="Last Name"
            label="Last Name"
            name="lastName"
          />
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
          <Field
            component={Input}
            placeholder="Confirm Password"
            label="Confirm Password"
            name="confirmPassword"
          />

          <button className="btn" disabled={props.invalid}>
            Register
          </button>
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

export default withoutAuth(
  reduxForm<FormValues>({ form: "register" })(register)
);
