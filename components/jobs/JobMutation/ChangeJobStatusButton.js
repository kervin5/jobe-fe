import React from "react";
import { Mutation } from "@apollo/react-components";

import { Button, Icon } from "semantic-ui-react";
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
  return (
    <Mutation mutation={POST_JOB_MUTATION} variables={{ jobId, status }}>
      {(postJobMutation, { error, loading, data }) => {
        if (error) return <p>Something went wrong!</p>;
        if (loading) return <p>Loading...</p>;
        if (data) Router.push(`/admin/jobs`);

        return (
          <Button
            positive
            icon
            labelPosition="left"
            onClick={postJobMutation}
            loading={loading}
            disabled={loading || data}
          >
            <Icon name="check" />
            {data ? "Success!" : children}
          </Button>
        );
      }}
    </Mutation>
  );
};

export default ChangeJobStatusButton;
