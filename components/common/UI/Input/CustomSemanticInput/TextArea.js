import React from "react";
import { TextArea } from "semantic-ui-react";

const CustomTextArea = ({
  placeholder,
  label,
  error,
  onChange,
  name,
  defaultValue
}) => {
  return (
    <div className={`field ${error ? "error" : ""}`}>
      <label>{label}</label>
      <TextArea
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};

CustomTextArea.defalutProps = {
  label: "",
  placeholder: ""
};

export default CustomTextArea;
