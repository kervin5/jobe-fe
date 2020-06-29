import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import JobListing from "./JobListing";
import Loader from "@/common/UI/Animated/Loader";

export const SINGLE_JOB_QUERY = gql`
  query SINGLE_JOB_QUERY($id: String!) {
    job(where: { id: $id }) {
      id
      title
      description
      disclaimer
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

      skills {
        id
        name
      }

      perks(where: { status: ACTIVE }) {
        id
        name
      }

      location {
        id
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

const INCREMENT_JOB_VIEW_COUNT_MUTATION = gql`
  mutation INCREMENT_JOB_VIEW_COUNT_MUTATION(id: String!) {
    id
    views
  }
`;

const SingleJobListing = ({ jobId, preview, jobData, countView }) => {
  const [incrementJobView, { data }] = useMutation(
    INCREMENT_JOB_VIEW_COUNT_MUTATION
  );
  useEffect(() => {
    if (countView && !preview) {
      incrementJobView()
        .then(console.log)
        .catch(console.log);
    }
  }, []);
  if (jobData)
    return (
      <JobListing
        data={{
          ...jobData,
          location: jobData.location.name,
          aboutCompany:
            jobData.disclaimer ||
            jobData.branch.description ||
            jobData.branch.company.description,
          company: jobData.branch.company.name
        }}
        preview={preview || !(jobData.status === "POSTED")}
      />
    );

  return (
    <Query query={SINGLE_JOB_QUERY} variables={{ id: jobId }}>
      {({ error, loading, data }) => {
        if (error) return <p>Error Loading, please refresh!</p>;
        if (loading) return <Loader />;
        if (!data.job) return <p>No job found for: {jobId}</p>;
        const singleJob = data.job;

        return (
          <JobListing
            data={{
              ...singleJob,
              location: singleJob.location.name,
              aboutCompany:
                singleJob.disclaimer ||
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
