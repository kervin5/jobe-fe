import React from "react";
import { TextArea } from "semantic-ui-react";

const CustomTextArea = ({ placeholder, label, error, onChange, name }) => {
  return (
    <div className={`field ${error ? "error" : ""}`}>
      <label>{label}</label>
      <TextArea placeholder={placeholder} name={name} onChange={onChange} />
    </div>
  );
};

CustomTextArea.defalutProps = {
  label: "",
  placeholder: ""
};

export default CustomTextArea;
