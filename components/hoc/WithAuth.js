import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import Router from "next/router";

export const ME_USER_QUERY = gql`
  query ME_USER_QUERY {
    me {
      id
      role {
        id
        name
      }
    }
  }
`;

const WithAuth = props => {
  return (
    <Query query={ME_USER_QUERY} fetchPolicy={"network-only"}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong</p>;
        if (!data.me) Router.push("/user/login");
        if (!data.me)
          return (
            <p>
              You need to login to access this page{" "}
              <Link href="/user/login">
                <a>Click here</a>
              </Link>
            </p>
          );
        return <React.Fragment>{props.children}</React.Fragment>;
      }}
    </Query>
  );
};

export default WithAuth;
