import { useState, useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import InputField from "../common/UI/Input/InputField";
import Button from "../common/UI/Button";
import { ME_USER_QUERY, userHasAccess } from "../../lib/auth";
import Router from "next/router";
// import { logInUser } from "../../data/auth";

const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      role {
        id
        name
        permissions {
          object
          actions
        }
      }
    }
  }
`;

const loginForm = props => {
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
    setFormData({
      ...formData,
      [fieldData.name]: {
        ...formData[fieldData.name],
        ...fieldData
      }
    });
  };

  const submitHandler = async (e, loginUserMutation) => {
    e.preventDefault();
    await setValidate(true);
    const { email, password } = formData;

    if (email.valid && password.valid) {
      const res = await loginUserMutation();

      if (res.data.login && !props.noredirect) {
        const route = userHasAccess(
          [{ object: "JOB", action: "CREATE" }],
          res.data.login.role.permissions
        )
          ? "/dashboard"
          : "/me";
        Router.push(route);
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
      <Mutation
        mutation={LOGIN_USER}
        variables={{
          email: formData.email.value,
          password: formData.password.value
        }}
        refetchQueries={[
          { query: ME_USER_QUERY },
          ...(props.refetchQueries || [])
        ]}
      >
        {(loginUser, { loading, error, called, data }) => (
          <form>
            {error && <p>Something went wrong</p>}
            <fieldset disabled={loading} aria-busy={loading}>
              {fieldsToRender}
              <br />
              <Button onClick={e => submitHandler(e, loginUser)} fullWidth>
                Sign In
              </Button>
            </fieldset>
          </form>
        )}
      </Mutation>
      <style jsx>{`
        form {
          margin-bottom: 30px;
          width: 100%;
          max-width: 500px;
        }

        fieldset {
          border: none;
        }
      `}</style>
    </React.Fragment>
  );
};

export default loginForm;
