// This is client side config only - don't put anything in here that shouldn't be public!

function getBasePath(localBasePath, remoteBasePath) {
  if (process.env.NODE_ENV === "production") {
    return remoteBasePath;
  } else {
    return localBasePath;
  }
}

const localBasePath = "http://localhost:3000";
const remoteBasePath = "https://www.myexactjobs.com";
export const basePath = getBasePath(localBasePath, remoteBasePath);
export const endpoint = `${basePath}/graphql`;
export const prodEndpoint = `${basePath}/graphql`;

export const take = 10;
