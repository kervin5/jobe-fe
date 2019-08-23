import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Container from "../../../components/common/Layout/Container";
import JobEditorForm from "../../../components/jobs/JobMutation/JobEditorForm";
import WithAuth from "../../../components/hoc/WithAuth";
import PageSection from "../../../components/common/Layout/PageSection";

const pageSytles = `
padding-left: 30px;
padding-right: 30px;
padding-top: 30px;
background-color: #F9F7F7;
`;

const SINGLE_JOB_DETAILS_QUERY = gql`
  query SINGLE_JOB_DETAILS_QUERY($id: ID!) {
    job(where: { id: $id }) {
      id
      title
      description
      minCompensation
      maxCompensation
      type
      qualifications
      requirements
      createdAt
      location {
        name
      }
    }
  }
`;

const EditJobPage = props => {
  return (
    <PageSection styles={pageSytles}>
      <Container>
        <Query query={SINGLE_JOB_DETAILS_QUERY} variables={{ id: props.jobId }}>
          {({ error, loading, data }) => {
            if (error) return <p>Something went wrong</p>;
            if (loading) return <p>Loading Job...</p>;
            return <JobEditorForm jobId={props.jobId} />;
          }}
        </Query>
      </Container>
    </PageSection>
  );
};

EditJobPage.getInitialProps = function(args) {
  const { jid } = args.query;
  const slugParts = jid.split("-");
  const jobId = slugParts[slugParts.length - 1];
  return { jobId };
};

// export default WithAuth(EditJobPage);
export default EditJobPage;
