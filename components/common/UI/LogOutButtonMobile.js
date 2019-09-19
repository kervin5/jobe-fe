import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Loader from "./Animated/Loader";
import { Icon } from "semantic-ui-react";
import variables from "../globalVariables";

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
          if (loading) return <Loader />;
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
