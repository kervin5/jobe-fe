import React, { useState, useEffect } from "react";
import variables from "../../../globalVariables";

const textInputField = props => {
  const [value, setValue] = useState(props.value || "");

  const changeHandler = e => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (props.change) {
      props.change(value);
    }
  }, [value]);

  let InputType = "input";

  if (props.inputType === "textarea") {
    InputType = "textarea";
  }

  return (
    <React.Fragment>
      <InputType
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
