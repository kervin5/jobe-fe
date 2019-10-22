import React from "react";
import { Mutation } from "react-apollo";
import { Button, Icon } from "semantic-ui-react";
import Router from "next/router";
import gql from "graphql-tag";

const POST_JOB_MUTATION = gql`
  mutation POST_JOB_MUTATION($jobId: ID!, $status: Status!) {
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
        if (data)
          Router.push(
            `/jobs/${data.updateJob.title.replace(" ", "-")}-${
              data.updateJob.id
            }`
          );
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
