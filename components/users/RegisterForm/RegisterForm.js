import React from "react";
import variables from "../../common/globalVariables";
import Loader from "../../common/UI/Animated/Loader";
import { useState, useEffect } from "react";
import InputField from "../../common/UI/Input/InputField";
import Title from "../../common/UI/Title";
import Button from "../../../components/common/UI/Button";
import axios from "../../../data/api";
import Router from "next/router";
import { logInUser } from "../../../data/auth";
import { userIsLoggedIn } from "../../../data/auth";
// POST https://myexactjobsapi.herokuapp.com/api/users
// name, email, password

const registerForm = props => {
  const [registerData, setRegisterData] = useState({
    fullName: {
      value: "",
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      valid: false,
      validation: {
        required: true,
        minLength: 5
      }
    },
    emailAddress: {
      value: "",
      type: "email",
      label: "Email Address",
      placeholder: "john@doe.com",
      valid: false,
      validation: {
        required: true,
        minLength: 5
      }
    },
    password: {
      value: "",
      type: "password",
      label: "Password",
      placeholder: " Password",
      valid: false,
      validation: {
        required: true,
        minLength: 5
      }
    }
  });
  const [submitted, setSubmitted] = useState(false);

  const registerSubmitCustomHandler =
    props.onSubmit ||
    (result => {
      return result ? Router.push("/dashboard") : null;
    });

  const [validate, setValidate] = useState(false);

  const updatedFieldHandler = (key, value, valid) => {
    const updatedState = {
      ...registerData,
      [key]: {
        ...registerData[key],
        value: value,
        valid: valid
      }
    };
    setRegisterData(updatedState);
  };

  const registerSubmitHandler = async e => {
    e.preventDefault();
    await setValidate(true);
    const { fullName, emailAddress, password } = registerData;
    if (fullName.valid && emailAddress.valid && password.valid) {
      try {
        const result = await axios({
          method: "post",
          url: "/users",
          data: {
            name: fullName.value,
            email: emailAddress.value,
            password: password.value
          }
        });

        logInUser(result.data.token);
        await setSubmitted(true);
        registerSubmitCustomHandler(true);

        console.log("worked");
      } catch (ex) {
        console.log("error", ex.response);
        setSubmitted(false);
        registerSubmitCustomHandler(false);

        console.log("didn't worked");
      }
    }
  };

  const registerFormData = ["fullName", "emailAddress", "password"].map(key => {
    const registerDataField = registerData[key];
    return (
      <InputField
        change={updatedFieldHandler}
        value={registerDataField.value}
        type={registerDataField.type}
        label={registerDataField.label}
        placeholder={registerDataField.placeholder}
        name={key}
        key={"registerField" + key}
        validate={validate}
        {...registerDataField.validation}
      />
    );
  });

  let formContent = (
    <React.Fragment>
      <br />
      {registerFormData}
      <br />
      <Button click={registerSubmitHandler} fullWidth disabled={submitted}>
        Submit
      </Button>
    </React.Fragment>
  );

  if (submitted) {
    formContent = <Loader />;
  }

  return (
    <React.Fragment>
      <form>
        <Title center>Register</Title>
        {formContent}
      </form>

      <style jsx>{`
        form {
          margin-bottom: 30px;
          width: 100%;
          max-width: 500px;
        }
      `}</style>
    </React.Fragment>
  );
};

export default React.memo(registerForm);
