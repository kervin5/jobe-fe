import React from "react";
import { Query } from "react-apollo";
import { ME_USER_QUERY } from "../../lib/auth";

const UserInfo = ({ children }) => {
  return (
    <Query query={ME_USER_QUERY}>
      {({ error, loading, data }) => {
        if (loading) return <span></span>;
        if (error) return <p>error</p>;
        if (!data.me) return <p>Please login</p>;
        return children({ userInfo: data.me });
      }}
    </Query>
  );
};

export default UserInfo;
