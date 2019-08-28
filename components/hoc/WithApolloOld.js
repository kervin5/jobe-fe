import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { endpoint, prodEndpoint } from "../../config";

function createClient({ ctx, headers, initialState }) {
  const extraHeaders = {
    authorization: ""
  };

  if (typeof window !== "undefined") {
    extraHeaders.authorization = window.localStorage.getItem("token");
  }

  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    cache: new InMemoryCache().restore(initialState || {}),
    credentials: "include",
    // ssrMode: true,
    headers: {
      ...headers,
      ...extraHeaders
      // authorization: token ? `Bearer ${token}` : ""
    }
  });
}

export default withApollo(createClient);
