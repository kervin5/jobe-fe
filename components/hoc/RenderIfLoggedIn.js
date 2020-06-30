import React from "react";
import Router from "next/router";
import { Query } from "@apollo/react-components";
import { Loader } from "semantic-ui-react";
import { ME_USER_QUERY, userHasAccess } from "@/lib/auth";

const RenderIfLoggedIn = ({ children, permissions, fallback, redirect }) => {
  return (
    <Query query={ME_USER_QUERY}>
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong</p>;
        if (loading) return <Loader active inline="centered" />;
        if (!data.me && redirect)
          Router.push(typeof redirect === "string" ? redirect : "/user/login");
        if (!data.me) return null;
        if (
          permissions &&
          !userHasAccess(permissions, data.me.role.permissions)
        )
          return fallback ? fallback : null;
        return <React.Fragment>{children}</React.Fragment>;
      }}
    </Query>
  );
};

export default RenderIfLoggedIn;
