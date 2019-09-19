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
    <div className="EditOrPublishButtons">
      <Button
        icon
        labelPosition="left"
        onClick={() => Router.push(`/dashboard/jobs/edit/${jobId}`)}
      >
        <Icon name="pencil" />
        Edit
      </Button>
      <RenderIfLoggedIn permissions={[{ object: "JOB", action: "PUBLISH" }]}>
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
                labelPosition="left"
                onClick={postJobMutation}
              >
                <Icon name="check" />
                Publish
              </Button>
            );
          }}
        </Mutation>
      </RenderIfLoggedIn>
      <Button
        positive
        icon
        labelPosition="left"
        onClick={() => Router.push("/dashboard")}
      >
        <Icon name="desktop" />
        Dashboard
      </Button>
      <style jsx>{`
        .EditOrPublishButtons {
          margin-bottom: 15px;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
}

export default EditOrPublishButtons;
