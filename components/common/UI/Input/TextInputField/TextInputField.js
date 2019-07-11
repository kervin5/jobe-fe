import React, { useState, useEffect } from "react";
import variables from "../../../globalVariables";
import validate from "../validate";

const textInputField = props => {
  const [value, setValue] = useState(props.value || "");
  const [valid, setValid] = useState(true);
  const [errors, setErrors] = useState([]);
  const [validation, setValidation] = useState({
    required: props.required || false,
    minLength: props.minLength || 0,
    maxLength: props.maxLength || 9999999
  });
  const [name, setName] = useState("");

  const changeHandler = e => {
    updateValidityStatus(e.target.value);
  };

  useEffect(() => {
    if (props.validate) {
      updateValidityStatus(value);
    }
  }, [props.validate]);

  //Passes the field status to a parent handler function if it exists
  useEffect(() => {
    if (props.change) {
      props.change({ name, value, valid, errors });
    }
  }, [value, errors, valid]);

  const updateValidityStatus = newValue => {
    const validityStatus = validate(props.inputType, newValue, validation);
    setValue(newValue);
    setErrors(validityStatus.errors);
    setValid(validityStatus.valid);
  };

  let InputFieldTag = "input";

  if (props.inputType === "textarea") {
    InputFieldTag = "textarea";
  }

  return (
    <React.Fragment>
      <InputFieldTag
        type={props.inputType}
        placeholder={props.placeholder}
        value={value}
        onChange={changeHandler}
        autoFocus={props.focused ? true : false}
      />

      <style jsx>{`
        input,
        textarea,
        select {
          border: none;
          margin: 5px 20px 5px 15px;
          width: 90%;
          outline: none;
        }

        input::placeholder,
        textarea::placeholder,
        select::placeholder {
          color: ${variables.secondaryTextColor};
        }

        textarea {
          min-height: 200px;
          padding-top: 15px;
        }

        label {
          color: ${variables.baseTextColor};
        }
      `}</style>
    </React.Fragment>
  );
};

export default React.memo(textInputField);
