import { useState } from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import InputField from "../common/UI/Input/InputField";
import Button from "../common/UI/Button";
import ErrorMessage from "../common/UI/ErrorMessage";
import { ME_USER_QUERY } from "../../lib/auth";

// import { logInUser } from "../../../data/auth";

const SIGNUP_USER = gql`
  mutation SIGNUP_USER($name: String!, $password: String!, $email: String!) {
    signup(email: $email, password: $password, name: $name) {
      id
      role {
        id
        name
      }
    }
  }
`;

const registerForm = props => {
  const [validate, setValidate] = useState(false);
  const [registerd, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      value: "",
      valid: false,
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      icon: "user",
      allowed: "alphanumeric"
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
      icon: "key",
      minLength: 6
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

      if (res.data.signup && !props.noredirect) {
        // logInUser(res.data.signup);
        Router.push(
          res.data.signup.role.name !== "candidate"
            ? "/dashboard"
            : "/resumes/upload"
        );
        // Router.push("/resumes/upload");
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
        minLength={fieldData.minLength || 0}
        allowed={fieldData.allowed}
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
      <Mutation
        mutation={SIGNUP_USER}
        variables={{ ...signUpData }}
        refetchQueries={[
          { query: ME_USER_QUERY },
          ...(props.refetchQueries || [])
        ]}
      >
        {(signupUser, { loading, error, called, data }) => {
          return (
            <>
              <form>
                <ErrorMessage error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  {fieldsToRender}
                  <br />
                  <Button onClick={e => submitHandler(signupUser, e)} fullWidth>
                    Register
                  </Button>
                </fieldset>
              </form>
            </>
          );
        }}
      </Mutation>
      <style jsx>{`
        form {
          margin: 0 auto 30px;
          width: 100%;
          max-width: 500px;
        }
      `}</style>
    </React.Fragment>
  );
};

export default registerForm;
