import React from "react";
import { Mutation } from "react-apollo";
import { Button, Icon } from "semantic-ui-react";
import Router from "next/router";
import gql from "graphql-tag";
import RenderIfLoggedIn from "../../hoc/RenderIfLoggedIn";

const POST_JOB_MUTATION = gql`
  mutation POST_JOB_MUTATION($jobId: ID!) {
    updateJob(
      where: { id: $jobId }

      data: { status: POSTED }
    ) {
      id
      title
      status
    }
  }
`;

function EditOrPublishButtons({ jobId }) {
  return (
    <Button.Group floated="right">
      <Button
        icon
        labelPosition="left"
        onClick={() => Router.push(`/dashboard/jobs/edit/${jobId}`)}
      >
        <Icon name="left arrow" />
        Edit
      </Button>
      <RenderIfLoggedIn access={["SUPERVISOR", "ADMIN"]}>
        <Mutation mutation={POST_JOB_MUTATION} variables={{ jobId }}>
          {(postJobMutation, { error, loading, data }) => {
            if (error) return <p>Something went wrong!</p>;
            if (loading) return <p>Loading...</p>;
            if (data)
              Router.push(
                `/jobs/${data.updateJob.title.replace(" ", "-")}-${
                  data.updateJob.id
                }`
              );
            if (data) return <p>Job published</p>;

            return (
              <Button
                positive
                icon
                labelPosition="right"
                onClick={postJobMutation}
              >
                Publish
                <Icon name="right arrow" />
              </Button>
            );
          }}
        </Mutation>
      </RenderIfLoggedIn>
      <Button
        positive
        icon
        labelPosition="right"
        onClick={() => Router.push("/dashboard")}
      >
        Dashboard
        <Icon name="right arrow" />
      </Button>
    </Button.Group>
  );
}

export default EditOrPublishButtons;
