import { useState } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "@apollo/client";
import Router from "next/router";
import ErrorMessage from "@/common/UI/ErrorMessage";
import InputField from "@/common/UI/Input/InputField";
import Button from "@/common/UI/Button";
import { userHasAccess } from "@/lib/auth";
import { ME_USER_QUERY } from "@/graphql/queries/users";
import appText from "@/lang/appText";

const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      __typename
      ... on User {
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

      ... on GraphqlError {
        type
        message
      }
    }
  }
`;

const loginForm = (props) => {
  const [formData, setFormData] = useState({
    email: {
      value: "",
      valid: false,
      type: "email",
      label: appText.objects.email.singular,
      placeholder: "jdoe@myemail.com",
      icon: "mail",
    },
    password: {
      value: "",
      valid: false,
      type: "password",
      label: appText.objects.password.singular,
      placeholder: "Password",
      icon: "lock",
    },
  });

  const [validate, setValidate] = useState(false);

  const changeHandler = (fieldData) => {
    setFormData({
      ...formData,
      [fieldData.name]: {
        ...formData[fieldData.name],
        ...fieldData,
      },
    });
  };

  const submitHandler = async (e, loginUserMutation) => {
    e.preventDefault();
    await setValidate(true);
    const { email, password } = formData;

    if (email.valid && password.valid) {
      const res = await loginUserMutation();

      if (res.data?.login?.["__typename"] === "User" && !props.noredirect) {
        const route = userHasAccess(
          [{ object: "JOB", action: "CREATE" }],
          res.data.login.role.permissions
        )
          ? "/admin/dashboard"
          : "/me";
        setTimeout(() => Router.push(route), 0);
      }
    }
  };

  const fieldsToRender = ["email", "password"].map((key) => {
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
        textTransform={"capitalize"}
      />
    );
  });

  return (
    <React.Fragment>
      <Mutation
        mutation={LOGIN_USER}
        variables={{
          email: formData.email.value,
          password: formData.password.value,
        }}
        refetchQueries={[
          { query: ME_USER_QUERY },
          ...(props.refetchQueries || []),
        ]}
      >
        {(loginUser, { loading, error, called, data }) => (
          <form>
            <ErrorMessage error={error} data={data} />
            <fieldset disabled={loading} aria-busy={loading}>
              {fieldsToRender}
              <br />
              <Button onClick={(e) => submitHandler(e, loginUser)} fullWidth>
                {appText.actions.login}
              </Button>
            </fieldset>
          </form>
        )}
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

export default loginForm;
