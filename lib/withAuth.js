import gql from "graphql-tag";
import Router from "next/router";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { endpoint, prodEndpoint } from "../config";
import fetch from "node-fetch";

const link = createHttpLink({
  uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
  credentials: "include",
  fetch
});

const client = new ApolloClient({
  uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
  link,
  cache: new InMemoryCache()
  // headers: {
  //   ...headers,
  //   ...extraHeaders
  //   // authorization: token ? `Bearer ${token}` : ""
  // }
});

export const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER {
    authorize
  }
`;

const withAuth = async ({ res, req }) => {
  const { data, error, loading } = await client.query({
    query: AUTHORIZE_USER,
    fetchPolicy: "network-only"
  });
  //   console.log("called");
  //   console.log(!data.authorize);
  console.log(data);
  if (!data.authorize) {
    // console.log(data, error, loading);
    redirect("/user/login", res);
  }
  return {};
};

export const redirectIfAuth = async ({ res, req }, url = "/dashboard") => {
  const { data, error, loading } = await client.query({
    query: AUTHORIZE_USER,
    fetchPolicy: "network-only"
  });

  console.log(data);
  if (data.authorize) {
    redirect(url, res);
  }

  return {};
};

const redirect = (url, res) => {
  if (res) {
    res.writeHead(302, {
      Location: url
    });
    res.end();
  } else {
    Router.push(url);
  }
};

export default withAuth;
