import gql from "graphql-tag";
import redirect from "./redirect";

export const ME_USER_QUERY = gql`
  query ME_USER_QUERY {
    me {
      id
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

export const ME_USER_QUERY_NEW = gql`
  query ME_USER_QUERY {
    me {
      id
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
  debugger;
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

const checkLoggedIn = apolloClient =>
  apolloClient
    .query({
      query: ME_USER_QUERY_NEW
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(err => {
      // Fail gracefully
      console.log(err);
      return { loggedInUser: {} };
    });

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
