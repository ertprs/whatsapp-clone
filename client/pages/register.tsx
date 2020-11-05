import React from "react";
import { withoutAuth } from "../HOCs/withoutAuth";
import Link from "next/link";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Input from "../components/Input";
import validator from "validator";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const register: React.FC<InjectedFormProps<FormValues>> = props => {
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

const validate = (formValues: FormValues) => {
  const errors = {} as FormValues;
  if (
    !formValues.firstName ||
    (formValues.firstName && !formValues.firstName.trim())
  ) {
    errors.firstName = "Please enter a first name";
  }
  if (
    !formValues.lastName ||
    (formValues.lastName && !formValues.lastName.trim())
  ) {
    errors.lastName = "Please enter a last name";
  }
  if (
    !formValues.email ||
    (formValues.email && !validator.isEmail(formValues.email))
  ) {
    errors.email = "Please enter a valid email";
  }
  if (
    !formValues.password ||
    (formValues.password && formValues.password.trim().length > 6)
  ) {
    errors.password = "Password must be six characters minimum";
  }
  if (
    !formValues.confirmPassword ||
    (formValues.confirmPassword &&
      formValues.confirmPassword !== formValues.password)
  ) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default withoutAuth(
  reduxForm<FormValues>({ form: "register", validate })(register)
);
