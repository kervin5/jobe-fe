import React from "react";
import { Query } from "react-apollo";
import { Loader } from "semantic-ui-react";
import { ME_USER_QUERY } from "@/lib/auth";
import Router from "next/router";

const RenderIfLoggedOut = ({ children, redirect }) => {
  return (
    <Query query={ME_USER_QUERY}>
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong</p>;
        if (loading) return <Loader active inline="centered" />;

        if (redirect && data.me) Router.push("/me");

        return !data.me ? <React.Fragment>{children}</React.Fragment> : null;
      }}
    </Query>
  );
};

export default RenderIfLoggedOut;
