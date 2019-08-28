import React from "react";
import { Query } from "react-apollo";
import { AUTHORIZE_USER } from "./WithAuth";
import Router from "next/router";

const RedirectIfAuth = props => {
  return (
    <Query query={AUTHORIZE_USER} fetchPolicy={"network-only"}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong</p>;
        if (!data.authorize)
          return <React.Fragment>{props.children}</React.Fragment>;
        if (data.authorize) Router.push("/dashboard");
        return <p>You are being redirected</p>;
      }}
    </Query>
  );
};

export default RedirectIfAuth;
