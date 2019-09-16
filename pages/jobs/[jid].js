import React, { useState } from "react";
import gql from "graphql-tag";
import redirect from "../../lib/redirect";
import variables from "../../components/common/globalVariables";
import Container from "../../components/common/Layout/Container";
import SingleJobListing from "../../components/jobs/JobListing/SingleJobListing";

import PageSection from "../../components/common/Layout/PageSection";

const pageStyles = `background-color:${variables.mutedColor1};justify-content: center;`;

const SINGLE_JOB_QUERY = gql`
  query SINGLE_JOB_QUERY($id: ID!) {
    job(where: { id: $id }) {
      id
      status
    }
  }
`;

const SingleJobView = props => {
  return (
    <PageSection styles={pageStyles}>
      <Container>
        <SingleJobListing jobId={props.jobId} />
      </Container>
    </PageSection>
  );
}; //eof

SingleJobView.getInitialProps = async function({ query, apolloClient, res }) {
  const { jid } = query;
  const slugParts = jid.split("-");
  const jobId = slugParts[slugParts.length - 1];

  const jobData = await apolloClient.query({
    query: SINGLE_JOB_QUERY,
    variables: { id: jobId }
  });

  if (jobData.data.job.status !== "POSTED") {
    redirect({ res }, "/");
  }

  return { jobId };
};

export default SingleJobView;
