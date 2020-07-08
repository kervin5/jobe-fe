import React, { useState } from "react";
import InputField from "@/common/UI/Input/InputField";
import { gql } from "@apollo/client";
import { Mutation } from "@apollo/react-components";
import Button from "@/common/UI/Button";
import Title from "@/common/UI/Title";

const REQUEST_PASSWORD_MUTATION = gql`
  mutation REQUEST_PASSWORD_MUTATION($email: String!) {
    requestReset(email: $email)
  }
`;

const passwordRequestForm = props => {
  const [validate, setValidate] = useState(false);
  const [formData, setFormData] = useState({
    email: {
      value: "",
      valid: false,
      type: "email",
      label: "Email",
      placeholder: "jdoe@myemail.com"
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

  const requestPasswordHandler = async (resetPasswordMutation, e) => {
    e.preventDefault();
    await setValidate(true);
    const { email } = formData;
    if (email.valid) {
      const res = await resetPasswordMutation();
    }
  };

  const fieldsToRender = ["email"].map(key => {
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
    <Mutation
      mutation={REQUEST_PASSWORD_MUTATION}
      variables={{ email: formData.email.value }}
    >
      {(requestPasswordChange, { error, loading, data }) => {
        return (
          <form>
            <Title size={"l"} center>
              Forgot Password?
            </Title>
            {error && <p className={"error"}>Cannot find that email address</p>}
            {!error && data && !loading && (
              <p>Please check your mailbox with a reset link</p>
            )}
            <fieldset disabled={loading} aria-busy={loading}>
              {fieldsToRender}
              <br />
              <Button
                onClick={e => requestPasswordHandler(requestPasswordChange, e)}
                fullWidth
              >
                Reset Password
              </Button>
            </fieldset>
            <style jsx>{`
              form {
                margin-bottom: 30px;
                width: 100%;
                max-width: 500px;
              }

              fieldset {
                border: none;
              }

              .error {
                color: red;
              }
            `}</style>
          </form>
        );
      }}
    </Mutation>
  );
};

export default passwordRequestForm;
