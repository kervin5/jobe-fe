import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { endpoint } from "../../config";

function createClient({ ctx, headers, initialState }) {
  const extraHeaders = {
    authorization: ""
  };

  if (typeof window !== "undefined") {
    extraHeaders.authorization = window.localStorage.getItem("token");
  }

  return new ApolloClient(
    {
      uri:
        process.env.NODE_ENV === "development"
          ? endpoint
          : process.env.GRAPHQL_URL,
      cache: new InMemoryCache().restore(initialState || {}),
      credentials: "include",
      headers: {
        ...headers,
        ...extraHeaders
        // authorization: token ? `Bearer ${token}` : ""
      }
    },
    {
      getDataFromTree: "always"
    }
  );
}

export default withApollo(createClient);
// request: operation => {
//   operation.setContext({
//     fetchOptions: {
//       credentials: "include"
//     },
//     headers
//   });
// }
