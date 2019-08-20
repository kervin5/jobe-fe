import { useState, useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import axios from "../../../data/api";
import InputField from "../../common/UI/Input/InputField";
import Button from "../../common/UI/Button";
import Title from "../../common/UI/Title";
import Router from "next/router";
import { logInUser } from "../../../data/auth";

const SIGNUP_USER = gql`
  mutation SIGNUP_USER($name: String!, $password: String!, $email: String!) {
    signup(email: $email, password: $password, name: $name)
  }
`;

const registerForm = () => {
  const [formData, setFormData] = useState({
    name: {
      value: "",
      valid: false,
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      icon: "user"
    },
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

  const submitHandler = async (signupUserMutation, e) => {
    e.preventDefault();
    await setValidate(true);
    const { email, password, name } = formData;

    if (email.valid && password.valid && name.valid) {
      const res = await signupUserMutation();
      console.log(res);
      if (res.data.signup) {
        logInUser(res.data.signup);
        Router.push("/dashboard");
      }

      // try {
      //   const result = await axios({
      //     method: "post",
      //     url: "/users",
      //     data: {
      //       email: email.value,
      //       password: password.value,
      //       name: name.value
      //     }
      //   });
      //   logInUser(result.data.token);
      //   Router.push("/dashboard");
      // } catch (ex) {
      //   console.log("Error", ex.response);
      // }
    }
  };

  const fieldsToRender = ["name", "email", "password"].map(key => {
    const fieldData = formData[key];
    return (
      <InputField
        change={changeHandler}
        name={key}
        key={"registerField" + key}
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
      <Mutation
        mutation={SIGNUP_USER}
        variables={{
          email: formData.name.value,
          password: formData.password.value,
          name: formData.name.value
        }}
      >
        {(signupUser, { loading, error, called, data }) => {
          return (
            <form>
              <fieldset disabled={loading} aria-busy={loading}>
                <Title center>Register</Title>
                {fieldsToRender}
                <br />
                <Button click={e => submitHandler(signupUser, e)} fullWidth>
                  Register
                </Button>
              </fieldset>
            </form>
          );
        }}
      </Mutation>
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
