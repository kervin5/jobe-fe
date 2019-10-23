const validateField = (type, value, validation, customMessages) => {
  let valid = false;
  let errors = [];
  let errorMessages = {
    required: "This field is required",
    minLength: `This field must have at least ${validation.minLength} characters`,
    maxLength: `This field must have ${validation.minLength} characters or less`,
    emailFormat: "Please enter a valid email",
    allowed: `Please remove any special characters`,
    ...customMessages
  };

  const emailIsValid = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const valueIsValid = value => {
    return !!value.match(/^[\w\s]+$/);
  };

  const addError = message => {
    if (!errors.includes(message)) {
      errors = errors.concat(message);
    }
  };

  const removeError = message => {
    if (errors.includes(message)) {
      errors = errors.filter(e => e !== message);
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
    console.log("invalid");
  } else {
    console.log({ validation, errors });
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
