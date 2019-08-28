import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";

export const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER {
    authorize
  }
`;

const WithAuth = props => {
  return (
    <Query query={AUTHORIZE_USER} fetchPolicy={"network-only"}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong</p>;
        if (!data.authorize)
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
