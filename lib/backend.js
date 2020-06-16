const endpoint = `http://localhost:4000/graphql`;
const prodEndpoint = `https://jobboard-be-gql.now.sh/graphql`;

module.exports = function getBackendUrl() {
  const isProduction = process.env.NODE_ENV === "production";
  const backendUri = isProduction ? prodEndpoint : endpoint;
  return backendUri;
};
