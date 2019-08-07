import React from "react";
import Head from "next/head";

const PageTitle = props => {
  return (
    <Head>
      <title>{props.title || ""}</title>
    </Head>
  );
};

export default PageTitle;
