import { useState, useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import InputField from "../common/UI/Input/InputField";
import Button from "../common/UI/Button";
import { ME_USER_QUERY } from "../../lib/auth";
import Router from "next/router";
import ErrorMessage from "../common/UI/ErrorMessage";
// import { logInUser } from "../../data/auth";

const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      role {
        id
        name
      }
    }
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $token: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      token: $token
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
    }
  }
`;

const passwordResetForm = props => {
  const [formData, setFormData] = useState({
    password: {
      value: "",
      valid: false,
      type: "password",
      label: "Password",
      placeholder: "Password",
      icon: "key"
    },

    confirmPassword: {
      value: "",
      valid: false,
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
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

  const submitHandler = async (e, resetPasswordMutation) => {
    e.preventDefault();
    await setValidate(true);
    const { password, confirmPassword } = formData;

    if (confirmPassword.valid && password.valid) {
      const res = await resetPasswordMutation();

      if (res.data.resetPassword && !props.noredirect) {
        Router.push("/me");
      }
    }
  };

  const fieldsToRender = ["password", "confirmPassword"].map(key => {
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
        mutation={RESET_PASSWORD_MUTATION}
        variables={{
          token: props.token,
          password: formData.password.value,
          confirmPassword: formData.confirmPassword.value
        }}
        refetchQueries={[
          { query: ME_USER_QUERY },
          ...(props.refetchQueries || [])
        ]}
      >
        {(resetPassword, { loading, error, called, data }) => (
          <form>
            {error && <ErrorMessage error={error} />}
            <fieldset disabled={loading} aria-busy={loading}>
              {fieldsToRender}
              <br />
              <Button onClick={e => submitHandler(e, resetPassword)} fullWidth>
                Save Password
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

export default passwordResetForm;
