import { gql } from "@apollo/client";

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
