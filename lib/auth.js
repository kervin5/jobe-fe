import gql from "graphql-tag";
import redirect from "./redirect";

export const ME_USER_QUERY = gql`
  query ME_USER_QUERY {
    me {
      id
      name
      createdAt
      role {
        id
        permissions {
          id
          object
          actions
        }
      }
    }
  }
`;

const protectPage = async (context, permissions, fallbackRoute) => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser.me) {
    redirect(context, "/user/login");
  }

  if (permissions) {
    if (!userHasAccess(permissions, loggedInUser.me.role.permissions))
      redirect(context, fallbackRoute);
  }
};

export const hidePage = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (loggedInUser.me) {
    redirect(context, "/me");
  }
};

const checkLoggedIn = apolloClient => {
  return apolloClient
    .query({
      query: ME_USER_QUERY,
      fetchPolicy: "no-cache" //TODO: Implement better cache policy
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(err => {
      // Fail gracefully
      console.log(err);
      return { loggedInUser: {} };
    });
};

export const userHasAccess = (requiredPermissions, userPermissions) => {
  let matches = 0;

  requiredPermissions.forEach(permission => {
    userPermissions.forEach(userPermission => {
      if (
        userPermission.actions.includes(permission.action) &&
        userPermission.object === permission.object
      )
        matches++;
    });
  });
  return matches > 0;
};

export default protectPage;
