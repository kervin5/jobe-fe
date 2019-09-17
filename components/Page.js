import React, { Component } from "react";
import Head from "./Head";
import Layout from "./common/Layout/Layout";

class Page extends Component {
  render() {
    return (
      <div>
        <Head />
        {/* <Header /> */}
        <Layout>{this.props.children}</Layout>
      </div>
    );
  }
}

export default Page;
