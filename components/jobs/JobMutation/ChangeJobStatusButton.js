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

const PublishJobButton = ({ jobId, status, children }) => {
  return (
    <Mutation mutation={POST_JOB_MUTATION} variables={{ jobId, status }}>
      {(postJobMutation, { error, loading, data }) => {
        if (error) return <p>Something went wrong!</p>;
        if (loading) return <p>Loading...</p>;
        if (data) Router.push(`/admin/dashboard`);
        if (data) return <p>Success!</p>;

        return (
          <Button positive icon labelPosition="left" onClick={postJobMutation}>
            <Icon name="check" />
            {children}
          </Button>
        );
      }}
    </Mutation>
  );
};

export default PublishJobButton;
