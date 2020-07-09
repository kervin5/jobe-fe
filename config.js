// This is client side config only - don't put anything in here that shouldn't be public!

function getBasePath(localBasePath, remoteBasePath) {
  if (process.env.NODE_ENV === "production") {
    return remoteBasePath;
  } else {
    return localBasePath;
  }
}

const localBasePath = "http://localhost:3000";
const remoteBasePath = process.env.NEXT_PUBLIC_PATH;
export const basePath = getBasePath(localBasePath, remoteBasePath);
export const endpoint = `${basePath}/graphql`;
export const eEmpactIntegrationEnabled = !!process.env
  .NEXT_PUBLIC_ENABLE_EEMPACT_INTEGRATION;

export const take = 10;
