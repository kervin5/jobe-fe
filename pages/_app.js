import React from "react";
import App from "next/app";
import withApollo from "../components/hoc/WithApollo";
import { ApolloProvider } from "react-apollo";
import Page from "../components/Page";
import "semantic-ui-css/semantic.min.css";
import "./app.css";

class MyApp extends App {
  static displayName = "MyApp";

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
