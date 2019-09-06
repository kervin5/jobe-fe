import React from "react";
import { Mutation } from "react-apollo";
import { Button, Icon } from "semantic-ui-react";
import Router from "next/router";
import gql from "graphql-tag";

const POST_JOB_MUTATION = gql`
  mutation POST_JOB_MUTATION($jobId: ID!) {
    updateJob(
      where: { id: $jobId }

      data: { status: POSTED }
    ) {
      id
      title
    }
  }
`;

function EditOrPublishButtons({ jobId }) {
  return (
    <Button.Group floated="right">
      <Button
        icon
        labelPosition="left"
        onClick={() => Router.push(`/jobs/edit/${jobId}`)}
      >
        <Icon name="left arrow" />
        Edit
      </Button>
      <Button.Or />
      <Mutation mutation={POST_JOB_MUTATION} variables={{ jobId }}>
        {(postJobMutation, { error, loading, data }) => {
          if (error) return <p>Something went wrong!</p>;
          if (loading) return <p>Loading...</p>;
          if (data) return <p>Job published</p>;
          return (
            <Button
              positive
              icon
              labelPosition="right"
              onClick={postJobMutation}
            >
              Continue
              <Icon name="right arrow" />
            </Button>
          );
        }}
      </Mutation>
    </Button.Group>
  );
}

export default EditOrPublishButtons;
