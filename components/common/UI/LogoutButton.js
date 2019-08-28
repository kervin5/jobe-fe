import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Loader from "./Animated/Loader";
import Button from "./Button";

const LOG_OUT_MUTATION = gql`
  mutation LOG_OUT_MUTATION {
    logout
  }
`;

const LogoutButton = () => {
  return (
    <Mutation mutation={LOG_OUT_MUTATION}>
      {(logOutMutation, { error, loading, data, client }) => {
        // console.log(client);
        if (client) {
          console.log(client);
          client.resetStore();
        }
        if (error) return <p>Logged out</p>;
        if (loading) return <Loader />;
        return <Button click={logOutMutation}>Sign Out</Button>;
      }}
    </Mutation>
  );
};

export default LogoutButton;
