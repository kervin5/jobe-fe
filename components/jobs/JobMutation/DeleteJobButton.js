import React from "react";
import { useMutation } from "@apollo/client";
import { Mutation } from "@apollo/react-components";
import { Button, Placeholder, Loader, Input } from "semantic-ui-react";
import { gql } from "@apollo/client";

const DELETE_JOB_MUTATION = gql`
  mutation DELETE_JOB_MUTATION($jobId: ID!) {
    deleteJob(id: $jobId) {
      id
      title
      status
    }
  }
`;

const DeleteJobButton = ({ jobId, refetchQueries }) => {
  const [deleteJobMutation, { error, loading, data }] = useMutation(
    DELETE_JOB_MUTATION
  );
  const handleClick = async () => {
    if (confirm("Are you sure?")) {
      await deleteJobMutation({ variables: { jobId }, refetchQueries });
    }
  };

  return (
    <Button
      icon="trash"
      color="red"
      onClick={() => handleClick(deleteJobMutation)}
    />
  );
};

export default DeleteJobButton;
