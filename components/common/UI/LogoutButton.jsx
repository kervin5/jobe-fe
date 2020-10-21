import React from "react";
import { useMutation } from "@apollo/client";

import { gql } from "@apollo/client";
import MenuItem from "@material-ui/core/MenuItem";

import Loader from "./Animated/Loader";
import appText from "@/lang/appText";

export const LOG_OUT_MUTATION = gql`
  mutation LOG_OUT_MUTATION {
    logout
  }
`;

const LogoutButton = () => {
  const [logOutMutation, { error, loading, data }] = useMutation(
    LOG_OUT_MUTATION
  );

  if (error) return <p>Logged out</p>;
  if (loading) return <Loader />;
  return (
    <MenuItem
      onClick={async () => {
        await logOutMutation();
        location.reload();
      }}
    >
      {appText.actions.signOut}
    </MenuItem>
  );
};

export default LogoutButton;
