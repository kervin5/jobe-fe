import React from "react";
import variables from "../../common/globalVariables";
import { useState, useEffect } from "react";
import InputField from "../../common/UI/Input/InputField";
import Title from "../../common/UI/Title";
import Button from "../../../components/common/UI/Button";
import axios from "../../../data/api";
import Router from "next/router";

// POST https://myexactjobsapi.herokuapp.com/api/users
// name, email, password

const registerForm = () => {
  const [registerData, setRegisterData] = useState({
    fullName: {
      value: "",
      valid: false,
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      valid: false
    },
    emailAddress: {
      value: "",
      valid: false,
      type: "text",
      label: "Email Address",
      placeholder: "john@doe.com",
      valid: false
    },
    password: {
      value: "",
      valid: false,
      type: "password",
      label: "Password",
      placeholder: " Password",
      valid: false
    }
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
    setValidate(true);
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

        window.sessionStorage.setItem("token", result.headers.token);
        Router.push("/dashboard");
      } catch (ex) {
        console.log("error", ex.response);
      }
    }
  };

  const registerFormData = Object.keys(registerData).map(key => {
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
        required
        rounded
        validate={validate}
      />
    );
  });

  return (
    <React.Fragment>
      <form>
        <Title center>Register</Title>
        <br />
        {registerFormData}
        <br />
        <Button click={registerSubmitHandler} fullWidth>
          Submit
        </Button>
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

export default registerForm;
