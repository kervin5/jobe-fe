import { useState, useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import InputField from "../common/UI/Input/InputField";
import Button from "../common/UI/Button";
import Router from "next/router";

// import { logInUser } from "../../../data/auth";

const SIGNUP_USER = gql`
  mutation SIGNUP_USER($name: String!, $password: String!, $email: String!) {
    signup(email: $email, password: $password, name: $name)
  }
`;

const registerForm = () => {
  const [validate, setValidate] = useState(false);
  const [registerd, setRegistered] = useState(false);
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
      type: "email",
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

  const changeHandler = fieldData => {
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

      if (res.data.signup) {
        // logInUser(res.data.signup);
        Router.push("/resumes/upload");
      }
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

  const signUpData = {
    email: formData.email.value,
    password: formData.password.value,
    name: formData.name.value
  };

  return (
    <React.Fragment>
      <Mutation mutation={SIGNUP_USER} variables={{ ...signUpData }}>
        {(signupUser, { loading, error, called, data }) => {
          return (
            <>
              <form>
                <fieldset disabled={loading} aria-busy={loading}>
                  {fieldsToRender}
                  <br />
                  <Button click={e => submitHandler(signupUser, e)} fullWidth>
                    Register
                  </Button>
                </fieldset>
              </form>
              {/* <ResumeUploadForm /> */}
            </>
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
