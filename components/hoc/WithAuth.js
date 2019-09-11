import React, { useState, useEffect } from "react";
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
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      Router.push(props.redirect || "/user/login");
    }
  }, [redirect]);

  return (
    // <Query query={ME_USER_QUERY} fetchPolicy={"network-only"}>
    <Query query={ME_USER_QUERY}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong</p>;
        if (!data.me) setRedirect(true);
        if (!data.me)
          return (
            <p>
              You need to login to access this page{" "}
              <Link href="/user/login">
                <a>Click here</a>
              </Link>
            </p>
          );
        if (
          props.admin &&
          data.me &&
          (!data.me.role || data.me.role.name === "CANDIDATE")
        ) {
          setRedirect(true);
          return <p>Access denied</p>;
        }

        if (
          props.nonadmin &&
          data.me &&
          (!data.me.role || data.me.role !== "CANDIDATE")
        ) {
          setRedirect(true);
          return <p>Access denied</p>;
        }
        return <React.Fragment>{props.children}</React.Fragment>;
      }}
    </Query>
  );
};

export default WithAuth;
