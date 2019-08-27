import gql from "graphql-tag";
import Router from "next/router";

export const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER {
    authorize
  }
`;

const withAuth = async ({ apolloClient, res }) => {
  const { data, error, loading } = await apolloClient.query({
    query: AUTHORIZE_USER,
    fetchPolicy: "network-only"
  });
  //   console.log("called");
  //   console.log(!data.authorize);
  //   console.log(data);
  if (!data.authorize) {
    // console.log(data, error, loading);
    redirect("/user/login", res);
  } else {
    return {};
  }
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
  } else {
    return {};
  }
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
