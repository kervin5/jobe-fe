import React, { useState, useEffect } from "react";
import variables from "../../../globalVariables";
import useInput from "../useInput";

const dropdownInputField = props => {
  const validation = { required: props.required };
  const [dropdownInput, setDropdownInput] = useInput({
    inputType: props.inputType,
    value: props.value,
    placeholder: props.placeholder,
    name: props.name,
    validation,
    customErrorMessages: {
      required: "Please select an option from the dropdown"
    }
  });
  const [touched, setTouched] = useState(false);
  const optionsToRender =
    props.options &&
    props.options.map((option, index) => {
      return isObject(option) ? (
        <option value={option.value} key={option.value + index}>
          {option.label}
        </option>
      ) : (
        <option value={option} key={option + index}>
          {option}
        </option>
      );
    });

  const handleOptionClick = e => {
    const newValue = e.target.value;
    setDropdownInput(newValue);
    setTouched(true);
  };

  useEffect(() => {
    if (props.change && (touched || props.validate)) {
      props.change({ ...dropdownInput, touched });
    }
  }, [dropdownInput]);

  useEffect(() => {
    if (props.validate) {
      setDropdownInput(dropdownInput.value);
    }
  }, [props.validate]);

  return (
    <select onChange={handleOptionClick} defaultValue={dropdownInput.value}>
      <option value="">{props.placeholder}</option>
      {optionsToRender}
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
          min-height: 300px;
          padding-top: 15px;
        }

        label {
          color: ${variables.baseTextColor};
        }
      `}</style>
    </select>
  );
};

const isObject = function(a) {
  return !!a && a.constructor === Object;
};

export default React.memo(dropdownInputField);
