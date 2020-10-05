import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "@/common/globalVariables";
// import App from "next/app";
import * as Sentry from "@sentry/react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apolloClient";

import Page from "@/components/Page";
import "jodit/build/jodit.min.css";
import "semantic-ui-css/semantic.min.css";
import "./app.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DNS,
  });
}

export default function App({ Component, pageProps, router }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const isAdminLayout = isAdminPage(router.pathname);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Page admin={isAdminLayout}>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  );
}
function isAdminPage(route) {
  return route.startsWith("/admin");
}
