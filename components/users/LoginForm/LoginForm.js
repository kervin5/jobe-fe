import { useState, useEffect } from "react";
import axios from "../../../data/api";
import InputField from "../../common/UI/Input/InputField";
import Button from "../../common/UI/Button";
import Title from "../../common/UI/Title";
import Router from "next/router";
import { logInUser } from "../../../data/auth";

const loginForm = () => {
  const [formData, setFormData] = useState({
    email: {
      value: "",
      valid: false,
      type: "text",
      label: "Email",
      placeholder: "jdoe@myemail.com",
      icon: "mail"
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

  const changeHandler = fieldData => {
    console.log(fieldData, formData[fieldData.name]);
    setFormData({
      ...formData,
      [fieldData.name]: {
        ...formData[fieldData.name],
        ...fieldData
      }
    });
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
        logInUser(result.data.token);
        Router.push("/dashboard");
      } catch (ex) {
        console.log("Error", ex.response);
      }
    }
  };

  const fieldsToRender = ["email", "password"].map(key => {
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
