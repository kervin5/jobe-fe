const validateField = (type, value, validation) => {
  let valid = false;
  let errors = [];

  const emailIsValid = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
    addError("This field is required");
  } else {
    removeError("This field is required");
  }

  if (value.length < validation.minLength) {
    addError(
      `This field must have at least ${validation.minLength} characters`
    );
  } else {
    removeError(
      `This field must have at least ${validation.minLength} characters`
    );
  }

  if (value.length > validation.maxLength) {
    addError(`This field must have ${validation.minLength} characters or less`);
  } else {
    removeError(
      `This field must have ${validation.minLength} characters or less`
    );
  }

  if (type === "email") {
    console.log("verify", emailIsValid(value));
    if (!emailIsValid(value)) {
      addError("Please enter a valid email");
    } else {
      removeError("Please enter a valid email");
    }
  }

  valid = errors.length <= 0;

  return { valid, errors, value };
};

export default validateField;
