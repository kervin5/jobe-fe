import React, { useEffect } from "react";

import { ThemeProvider } from "styled-components";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import theme from "@/common/globalVariables";
import { purple } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import GlobalStyle from "../components/common/globalStyles";
import * as Sentry from "@sentry/react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apolloClient";

import Page from "@/components/Page";
import "jodit/build/jodit.min.css";

import "./app.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DNS,
  });
}

const customMaterialTheme = createMuiTheme({});

export default function App({ Component, pageProps, router }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const isAdminLayout = isAdminPage(router.pathname);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <MaterialThemeProvider theme={customMaterialTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Page admin={isAdminLayout}>
            <Component {...pageProps} />
          </Page>
        </ThemeProvider>
      </MaterialThemeProvider>
    </ApolloProvider>
  );
}
function isAdminPage(route) {
  return route.startsWith("/admin");
}
