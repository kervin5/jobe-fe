import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import JobListing from "./JobListing";
import Loader from "../../common/UI/Animated/Loader";

export const SINGLE_JOB_QUERY = gql`
  query SINGLE_JOB_QUERY($id: ID!) {
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
      status
      location {
        name
        latitude
        longitude
      }
      branch {
        id
        name
        description
      }
    }
  }
`;

const SingleJobListing = ({ jobId, preview }) => {
  return (
    <Query query={SINGLE_JOB_QUERY} variables={{ id: jobId }}>
      {({ error, loading, data }) => {
        if (error) return <p>Error!</p>;
        if (loading) return <Loader />;
        if (!data.job) return <p>No job found for: {jobId}</p>;
        const singleJob = data.job;

        return (
          <JobListing
            title={singleJob.title}
            location={singleJob.location.name}
            company={"Target"} //change later
            about={singleJob.description}
            description={singleJob.description}
            minAmount={singleJob.minCompensation}
            maxAmount={singleJob.maxCompensation}
            type={singleJob.type}
            qualifications={singleJob.qualifications}
            requirements={singleJob.requirements}
            jobId={singleJob.id}
            aboutCompany={singleJob.branch.description}
            preview={preview || !(singleJob.status === "POSTED")}
          />
        );
      }}
    </Query>
  );
};

export default SingleJobListing;
