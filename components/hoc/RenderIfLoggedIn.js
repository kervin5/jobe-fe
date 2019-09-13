import React from "react";
import { Query } from "react-apollo";
import { Loader } from "semantic-ui-react";
import { ME_USER_QUERY } from "../../lib/auth";

const RenderIfLoggedIn = ({ children, access }) => {
  return (
    <Query query={ME_USER_QUERY}>
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong</p>;
        if (loading) return <Loader active inline="centered" />;
        if (!data.me) return null;
        if (access && !access.includes(data.me.role.name)) return null;
        return <React.Fragment>{children}</React.Fragment>;
      }}
    </Query>
  );
};

export default RenderIfLoggedIn;
