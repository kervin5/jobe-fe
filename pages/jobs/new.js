import React from "react";
import Container from "../../components/common/Layout/Container";
import JobCreatorForm from "../../components/jobs/JobMutation/JobCreatorForm";
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
    <PageSection styles={pageSytles}>
      <Container>
        <JobCreatorForm />
      </Container>
    </PageSection>
  );
};

newJobPage.getInitialProps = async function(props) {
  await withAuth(props);
};

export default newJobPage;
