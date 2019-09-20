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
      status
      createdAt
      updatedAt
      categories {
        id
        name
      }

      location {
        name
        latitude
        longitude
      }
      branch {
        id
        name
        description
        company {
          id
          name
          description
        }
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
            data={{
              ...singleJob,
              location: singleJob.location.name,
              aboutCompany:
                singleJob.branch.description ||
                singleJob.branch.company.description,
              company: singleJob.branch.company.name
            }}
            preview={preview || !(singleJob.status === "POSTED")}
          />
        );
      }}
    </Query>
  );
};

export default SingleJobListing;
