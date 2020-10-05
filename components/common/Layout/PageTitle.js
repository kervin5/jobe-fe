import React from "react";
import Head from "next/head";

const PageTitle = (props) => {
  return (
    <Head>
      <title>{jsUcfirst(props.title) || jsUcfirst(props.children) || ""}</title>
    </Head>
  );
};

function jsUcfirst(string) {
  if (!string) return undefined;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default PageTitle;
