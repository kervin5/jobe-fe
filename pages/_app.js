import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "@/common/globalVariables";
// import App from "next/app";

import { ApolloProvider } from "react-apollo";
import { useApollo } from "@/lib/apolloClient";
import { initMatomo } from "@/lib/matomo";
import Page from "@/components/Page";
import "semantic-ui-css/semantic.min.css";
import "./app.css";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  useEffect(() => {
    initMatomo({
      siteId: 1,
      piwikUrl: "https://analytics.exactstaff.com"
    });
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  );
}
