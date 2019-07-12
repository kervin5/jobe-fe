import React, { useState, useEffect } from "react";
import variables from "../../../globalVariables";
import useInput from "../useInput";

const textInputField = props => {
  const validation = {
    required: props.required,
    maxLength: props.maxLength,
    minLength: props.minLength
  };
  const [textFieldState, setTextFieldState] = useInput({
    type: props.inputType,
    value: props.value,
    placeholder: props.placeholder,
    name: props.name,
    validation: validation
  });
  const [touched, setTouched] = useState(false);

  const handleBlur = e => {
    setTouched(true);
    setTextFieldState(e.target.value);
  };

  const handleChange = e => {
    setTouched(true);
    setTextFieldState(e.target.value);
  };

  useEffect(() => {
    if (!props.touched && props.validate) {
      setTouched(true);
    }
    if ((touched || props.validate) && props.change) {
      setTextFieldState(textFieldState.value);
      props.change({ ...textFieldState, touched });
    }
  }, [touched, props.validate, textFieldState.valid, textFieldState.value]);

  let InputFieldTag = "input";

  if (props.inputType === "textarea") {
    InputFieldTag = "textarea";
  }

  return (
    <React.Fragment>
      <InputFieldTag
        type={textFieldState.type}
        placeholder={textFieldState.placeholder}
        value={textFieldState.value}
        onChange={handleChange}
        onBlur={handleBlur}
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
