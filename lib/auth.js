export const userHasAccess = (requiredPermissions, userPermissions) => {
  let matches = 0;

  requiredPermissions.forEach((permission) => {
    userPermissions.forEach((userPermission) => {
      if (
        userPermission.actions.includes(permission.action) &&
        userPermission.object === permission.object
      )
        matches++;
    });
  });
  return matches > 0;
};
