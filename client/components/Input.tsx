import React from "react";
import { WrappedFieldProps } from "redux-form";

interface Props extends WrappedFieldProps {
  label: string;
  placeholder: string;
  name: string;
}

const Input: React.FC<Props> = ({ label, placeholder, name, input, meta }) => {
  return (
    <div className="form_group">
      {meta.touched && meta.error && (
        <div style={{ color: "red" }}>{meta.error}</div>
      )}
      <input
        type="text"
        className="input"
        placeholder={placeholder}
        {...input}
        id={name}
      />
      <label className="form_label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Input;
