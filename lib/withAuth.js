import gql from "graphql-tag";
import Router from "next/router";

export const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER {
    authorize
  }
`;

const withAuth = async ({ res, apolloClient }) => {
  const { data, error, loading } = await apolloClient.query({
    query: AUTHORIZE_USER,
    fetchPolicy: "network-only"
  });

  if (!data.authorize) {
    redirect("/user/login", res);
  }
  return {};
};

export const redirectIfAuth = async (
  { res, apolloClient },
  url = "/dashboard"
) => {
  const { data, error, loading } = await apolloClient.query({
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
