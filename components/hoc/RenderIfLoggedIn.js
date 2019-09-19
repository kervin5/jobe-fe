import React from "react";
import { Query } from "react-apollo";
import { Loader } from "semantic-ui-react";
import { ME_USER_QUERY, userHasAccess } from "../../lib/auth";

const RenderIfLoggedIn = ({ children, permissions }) => {
  return (
    <Query query={ME_USER_QUERY}>
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong</p>;
        if (loading) return <Loader active inline="centered" />;
        if (!data.me) return null;
        if (
          permissions &&
          !userHasAccess(permissions, data.me.role.permissions)
        )
          return null;
        return <React.Fragment>{children}</React.Fragment>;
      }}
    </Query>
  );
};

export default RenderIfLoggedIn;
