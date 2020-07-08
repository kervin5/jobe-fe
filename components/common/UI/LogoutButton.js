import React from "react";
import { Mutation } from "@apollo/react-components";
import { Dropdown } from "semantic-ui-react";
import { gql } from "@apollo/client";
import Loader from "./Animated/Loader";

export const LOG_OUT_MUTATION = gql`
  mutation LOG_OUT_MUTATION {
    logout
  }
`;

const LogoutButton = () => {
  return (
    <Mutation mutation={LOG_OUT_MUTATION}>
      {(logOutMutation, { error, loading, data }) => {
        if (error) return <p>Logged out</p>;
        if (loading) return <Loader />;
        return (
          <Dropdown.Item
            onClick={async () => {
              await logOutMutation();
              location.reload();
            }}
          >
            Sign Out
          </Dropdown.Item>
        );
      }}
    </Mutation>
  );
};

export default LogoutButton;
