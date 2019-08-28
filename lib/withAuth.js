import gql from "graphql-tag";
import Router from "next/router";
import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";
import fetch from "node-fetch";

const client = new ApolloClient({
  fetch: fetch,
  ssrMode: true,
  uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
  credentials: "include",
  fetchOptions: { credentials: "include" }
});

export const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER {
    authorize
  }
`;

const withAuth = async ({ res }) => {
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

export const redirectIfAuth = async ({ res }, url = "/dashboard") => {
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
