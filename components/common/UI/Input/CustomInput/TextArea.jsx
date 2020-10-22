import React from "react";
import TextField from "@material-ui/core/TextField";

const CustomTextArea = ({
  placeholder,
  label,
  error,
  onChange,
  name,
  defaultValue,
}) => {
  return (
    <div className={`field ${error ? "error" : ""}`}>
      <TextField
        id={name}
        label={label}
        name={name}
        multiline
        rows={4}
        defaultValue={defaultValue}
        onChange={onChange}
        variant="outlined"
        placeholder={placeholder}
      />
    </div>
  );
};

CustomTextArea.defalutProps = {
  label: "",
  placeholder: "",
};

export default CustomTextArea;
