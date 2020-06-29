import React from "react";
import { Query } from "@apollo/react-components";
import { ME_USER_QUERY } from "@/lib/auth";

const UserInfo = ({ children }) => {
  return (
    <Query query={ME_USER_QUERY}>
      {({ error, loading, data }) => {
        return children({ me: data ? data.me : undefined, error, loading });
      }}
    </Query>
  );
};

export default UserInfo;
