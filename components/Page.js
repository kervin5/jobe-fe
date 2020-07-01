import React, { useState } from "react";
import Head from "./Head";
import Layout from "@/common/Layout/Layout";
import ApplicationContext from "@/context/applicationContext";

const Page = props => {
  const defaultLanguage = "en";
  const [language, setLanguage] = useState(defaultLanguage);

  return (
    <div>
      <ApplicationContext.Provider value={{ language, setLanguage }}>
        <Head />
        <Layout admin={props.admin}>{props.children}</Layout>
      </ApplicationContext.Provider>
    </div>
  );
};

export default Page;
