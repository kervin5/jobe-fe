import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Query } from "@apollo/react-components";
import JobListing from "./JobListing";
import Loader from "@/common/UI/Animated/Loader";
import { SINGLE_JOB_QUERY } from "@/graphql/queries/jobs";
import { INCREMENT_JOB_VIEW_COUNT_MUTATION } from "@/graphql/mutations/jobs";

const SingleJobListing = ({ jobId, preview, jobData, countView }) => {
  const [incrementJobView, { data }] = useMutation(
    INCREMENT_JOB_VIEW_COUNT_MUTATION
  );
  useEffect(() => {
    if (countView && !preview) {
      incrementJobView({ variables: { id: jobId } });
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
          company: jobData.branch.company.name,
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
        const singleJob = data?.job;

        return (
          <JobListing
            data={{
              ...singleJob,
              location: singleJob.location.name,
              aboutCompany:
                singleJob.disclaimer ||
                singleJob.branch.description ||
                singleJob.branch.company.description,
              company: singleJob.branch.company.name,
            }}
            preview={preview || !(singleJob.status === "POSTED")}
          />
        );
      }}
    </Query>
  );
};

export default SingleJobListing;
