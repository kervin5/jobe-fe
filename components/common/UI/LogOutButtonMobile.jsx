import React from "react";
import { useMutation } from "@apollo/client";

import { gql } from "@apollo/client";
import Icon from "@material-ui/core/Icon";

const LOG_OUT_MUTATION = gql`
  mutation LOG_OUT_MUTATION {
    logout
  }
`;

const LogoutButton = () => {
  const [logOutMutation, { error, loading, data }] = useMutation(
    LOG_OUT_MUTATION
  );

  if (error) return <p>Logged out</p>;
  return (
    <Icon
      fontSize="large"
      onClick={async () => {
        await logOutMutation();
        location.reload();
      }}
    >
      exit_to_app
    </Icon>
  );
};

export default LogoutButton;
