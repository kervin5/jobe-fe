import React from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { Icon } from "semantic-ui-react";
import variables from "@/common/globalVariables";

const LOG_OUT_MUTATION = gql`
  mutation LOG_OUT_MUTATION {
    logout
  }
`;

const LogoutButton = () => {
  return (
    <>
      <Mutation mutation={LOG_OUT_MUTATION}>
        {(logOutMutation, { error, loading, data }) => {
          if (error) return <p>Logged out</p>;
          return (
            <Icon
              name="sign-out"
              inverted
              color="grey"
              size="large"
              onClick={async () => {
                await logOutMutation();
                location.reload();
              }}
            />
          );
        }}
      </Mutation>
      <style jsx>{`
        .logout {
          border: none;
          background-color: ${variables.accentColor1};
        }
      `}</style>
    </>
  );
};

export default LogoutButton;
