import { useState, useEffect } from "react";
import axios from "../../../data/api";
import InputField from "../../common/UI/Input/InputField";
import Button from "../../common/UI/Button";
import Title from "../../common/UI/Title";
import Router from "next/router";

const loginForm = () => {
  const [formData, setFormData] = useState({
    email: {
      value: "",
      valid: false,
      type: "text",
      label: "Email",
      placeholder: "jdoe@myemail.com",
      icon: "envelope"
    },
    password: {
      value: "",
      valid: false,
      type: "password",
      label: "Password",
      placeholder: "Password",
      icon: "key"
    }
  });

  const [validate, setValidate] = useState(false);

  const changeHandler = (key, value, valid) => {
    const newState = {
      ...formData,
      [key]: {
        ...formData[key],
        value: value,
        valid: valid
      }
    };
    setFormData(newState);
  };

  const submitHandler = async e => {
    e.preventDefault();
    setValidate(true);
    const { email, password } = formData;

    if (email.valid && password.valid) {
      try {
        const result = await axios({
          method: "post",
          url: "/auth",
          data: {
            email: email.value,
            password: password.value
          }
        });
        window.sessionStorage.setItem("token", result.data.token);
        Router.push("/dashboard");
      } catch (ex) {
        console.log("Error", ex.response);
      }
    }
  };

  const fieldsToRender = Object.keys(formData).map(key => {
    const fieldData = formData[key];
    return (
      <InputField
        change={changeHandler}
        name={key}
        key={"loginField" + key}
        type={fieldData.type}
        label={fieldData.label}
        rounded
        placeholder={fieldData.placeholder}
        value={fieldData.value}
        label={fieldData.label}
        icon={fieldData.icon}
        required
        validate={validate}
      />
    );
  });

  return (
    <React.Fragment>
      <form>
        <Title center>Login</Title>
        {fieldsToRender}
        <br />
        <Button click={submitHandler} fullWidth>
          Sign In
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

export default loginForm;
