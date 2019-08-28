import gql from "graphql-tag";
import Router from "next/router";
import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";

export const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER {
    authorize
  }
`;

const client = new ApolloClient({
  url: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
  fetchOptions: { credentials: "include" }
});

const withAuth = async ({ res }) => {
  try {
    const { error, loading, data } = await client.query({
      query: AUTHORIZE_USER
      // fetchPolicy: "network-only"
    });

    console.log(error, loading, data);
  } catch (err) {
    console.log(err.message);
    console.log(err);
  }

  return {};
};

export const redirectIfAuth = async (
  { apolloClient, res },
  url = "/dashboard"
) => {
  const { data, error, loading } = await apolloClient.query({
    query: AUTHORIZE_USER,
    fetchPolicy: "network-only"
  });
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
