import { useState, useEffect } from "react";
import validateField from "./validate";

const useInput = ({
  type,
  value,
  placeholder,
  name,
  validation,
  customErrorMessages
}) => {
  const [inputName, setInputName] = useState(name || "");
  const [inputValue, setInputValue] = useState(value || "");
  const [inputPlaceholder, setInputPlaceholder] = useState(placeholder || "");
  const [inputType, setInputType] = useState(type || "text");
  const [inputValid, setInputValid] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);
  const [inputErrors, setInputErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [inputValidation, setInputValidation] = useState({
    required: false,
    minLength: 0,
    maxLength: 9999999,
    ...validation
  });

  const validate = value => {
    const result = validateField(type, value, inputValidation, {
      ...customErrorMessages
    });
    setInputValid(result.valid);
    setInputErrors(result.errors);
    setInputValue(value);
  };

  const setInputField = inputValue => {
    validate(inputValue);
  };

  return [
    {
      value: inputValue,
      valid: inputValid,
      errors: inputErrors,
      name: inputName,
      placeholder: inputPlaceholder,
      type: inputType
    },
    setInputField
  ];
};

export default useInput;
