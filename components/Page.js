import React, { Component } from "react";
import Head from "./Head";
import Layout from "./common/Layout/Layout";

class Page extends Component {
  render() {
    return (
      <div>
        <Head />
        {/* <Header /> */}
        <Layout>
          <div>{this.props.children}</div>
        </Layout>
      </div>
    );
  }
}

export default Page;
