import gql from "graphql-tag";
import Router from "next/router";

export const AUTHORIZE_USER = gql`
  query AUTHORIZE_USER {
    authorize
  }
`;

const withAuth = ({ apolloClient, res }) => {
  apolloClient
    .query({
      query: AUTHORIZE_USER,
      fetchPolicy: "network-only"
    })
    .then(({ data, loading, error }) => {
      if (!data.authorize) {
        redirect("/user/login", res);
      }
    })
    .catch(err => {
      console.log(err.message);
      console.log(err);
    });

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
