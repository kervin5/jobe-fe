import React from "react";
import Layout from "../../components/common/Layout/Layout";
// import classes from './new.module.scss';
import Container from "../../components/common/Layout/Container";
import JobCreator from "../../components/jobs/JobCreator/JobCreator.js";
import WithAuth from "../../components/hoc/WithAuth";

import PageSection from "../../components/common/Layout/PageSection";

const pageSytles = `
padding-left: 30px;
padding-right: 30px;
padding-top: 30px;
background-color: #F9F7F7;
`;

const newJobPage = props => {
  return (
    <Layout title={"New Job"}>
      <PageSection styles={pageSytles}>
        <Container>
          <JobCreator />
        </Container>
      </PageSection>
    </Layout>
  );
};

export default WithAuth(newJobPage);
