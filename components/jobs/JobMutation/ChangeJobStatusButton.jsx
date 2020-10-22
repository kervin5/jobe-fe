import React from "react";
import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import Router from "next/router";
import { gql } from "@apollo/client";

const POST_JOB_MUTATION = gql`
  mutation POST_JOB_MUTATION($jobId: String!, $status: JobStatus!) {
    updateJob(
      where: { id: $jobId }

      data: { status: $status }
    ) {
      id
      title
      status
    }
  }
`;

const ChangeJobStatusButton = ({ jobId, status, children }) => {
  const [
    postJobMutation,
    { error, loading, data },
  ] = useMutation(POST_JOB_MUTATION, { variables: { jobId, status } });

  if (error) return <p>Something went wrong!</p>;
  if (loading) return <p>Loading...</p>;
  if (data) Router.push(`/admin/jobs`);

  return (
    <Button
      onClick={postJobMutation}
      disabled={loading || data}
      startIcon={<CheckIcon />}
    >
      {data ? "" : children}
    </Button>
  );
};

export default ChangeJobStatusButton;
