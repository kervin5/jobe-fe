import React from "react";
import { Query } from "react-apollo";
import { ME_USER_QUERY } from "./WithAuth";
import Router from "next/router";

const RedirectIfAuth = props => {
  return (
    // <Query query={ME_USER_QUERY} fetchPolicy={"network-only"}>
    <Query query={ME_USER_QUERY}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong</p>;
        if (!data.me) return <React.Fragment>{props.children}</React.Fragment>;
        if (data.me)
          Router.push(data.me.role.name !== "CANDIDATE" ? "/dashboard" : "/me");
        return <p>You are being redirected</p>;
      }}
    </Query>
  );
};

export default RedirectIfAuth;
