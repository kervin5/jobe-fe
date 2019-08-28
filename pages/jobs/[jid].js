import React, { useState } from "react";

import variables from "../../components/common/globalVariables";
import Container from "../../components/common/Layout/Container";
import SingleJobListing from "../../components/jobs/JobListing/SingleJobListing";

import PageSection from "../../components/common/Layout/PageSection";

const pageStyles = `background-color:${variables.mutedColor1};justify-content: center;`;

const SingleJobView = props => {
  return (
    <PageSection styles={pageStyles}>
      <Container>
        <SingleJobListing jobId={props.jobId} />
      </Container>
    </PageSection>
  );
}; //eof

SingleJobView.getInitialProps = async function({ query }) {
  const { jid } = query;
  const slugParts = jid.split("-");
  const jobId = slugParts[slugParts.length - 1];

  return { jobId };
};

export default SingleJobView;
