import appText from "@/lang/appText";

const validateField = (type, value, validation, customMessages) => {
  let valid = false;
  let errors = [];
  let errorMessages = {
    required: appText.messages.validation.required,
    minLength: appText.messages.validation.minLength(validation.minLength),
    maxLength: appText.messages.validation.maxLength(validation.maxLength),
    emailFormat: appText.messages.validation.email,
    allowed: appText.messages.validation.specialChars,
    ...customMessages,
  };

  const emailIsValid = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const valueIsValid = (value) => {
    return !!value.match(/^[\w\s]+$/);
  };

  const addError = (message) => {
    if (!errors.includes(message)) {
      errors = errors.concat(message);
    }
  };

  const removeError = (message) => {
    if (errors.includes(message)) {
      errors = errors.filter((e) => e !== message);
    }
  };

  if (validation.required && value === "") {
    addError(errorMessages.required);
  }

  if (value.length < validation.minLength) {
    addError(errorMessages.minLength);
  }

  if (
    validation.allowed &&
    validation.allowed === "alphanumeric" &&
    !valueIsValid(value)
  ) {
    addError(errorMessages.allowed);
  }

  if (value.length > validation.maxLength) {
    addError(errorMessages.maxLength);
  }

  if (type === "email") {
    if (!emailIsValid(value)) {
      addError(errorMessages.emailFormat);
    }
  }

  valid = errors.length <= 0;

  return { valid, errors, value };
};

export default validateField;
