import gql from "graphql-tag";
import redirect from "./redirect";

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

const protectPage = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser.me) {
    redirect(context, "/user/login");
  }
};

export const hidePage = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (loggedInUser.me) {
    redirect(context, "/me");
  }
};

const checkLoggedIn = apolloClient =>
  apolloClient
    .query({
      query: ME_USER_QUERY
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });

export default protectPage;
