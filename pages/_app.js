import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import WithData from "../components/hoc/WithData";
import Page from "../components/Page";
import "semantic-ui-css/semantic.min.css";
import "./app.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default WithData(MyApp);
