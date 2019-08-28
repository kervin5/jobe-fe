import gql from "graphql-tag";
import Router from "next/router";

export const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER {
    authorize
  }
`;

const withAuth = async ({ apolloClient, res }) => {
  try {
    const { data, error, loading } = await apolloClient.query({
      query: AUTHORIZE_USER,
      fetchPolicy: "network-only"
    });
    if (error) {
      console.log(error);
    }
  } catch (ex) {
    console.log(ex);
  }

  if (!data.authorize) {
    redirect("/user/login", res);
  }
  return {};
};

export const redirectIfAuth = async (
  { apolloClient, res },
  url = "/dashboard"
) => {
  try {
    const { data, error, loading } = await apolloClient.query({
      query: AUTHORIZE_USER,
      fetchPolicy: "network-only"
    });

    console.log(data, error, loading);
    if (error) {
      console.log(error);
    }
  } catch (ex) {
    console.log(ex);
  }
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
