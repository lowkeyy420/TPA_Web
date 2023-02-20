import React, { forwardRef, InputHTMLAttributes } from "react";
import style from "../styles/Input.module.scss";

interface MyProps {
  id?: string;
  type?: string;
  placeholder?: string;
  height?: string | number;
  width?: string | number;
  required?: boolean;
  ref?: any;
  label?: string;
}

const AuthInputField = forwardRef<HTMLInputElement, MyProps>((props, ref) => {
  const size = {
    height: props.height,
    width: props.width,
  };

  return (
    <div className={style.authField}>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        style={size}
        required={props.required}
        ref={ref}
      />
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
    </div>
  );
});

AuthInputField.displayName = "AuthInputField";

export default AuthInputField;
