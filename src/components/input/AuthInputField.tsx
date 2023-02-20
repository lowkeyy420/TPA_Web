import React from "react";

interface MyProps {
  email?: boolean;
  password?: boolean;
  number?: boolean;
  area?: boolean;
  placeholder?: string;
  height?: number;
  width?: number;
  required?: boolean;
  onChange: any;
  value?: any;
}

function AuthInputField() {
  return <div>AuthInputField</div>;
}

export default AuthInputField;
