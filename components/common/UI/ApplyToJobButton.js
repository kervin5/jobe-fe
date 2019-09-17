import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { Loader } from "semantic-ui-react";
import RegisterToApplyButton from "./RegisterToApplyButton";
import Button from "./Button";

const APPLY_TO_JOB_MUTATION = gql`
  mutation APPLY_TO_JOB_MUTATION($jobId: ID!) {
    createApplication(job: { connect: { id: $jobId } }) {
      id
      job {
        id
        title
      }
    }
  }
`;

export const CHECK_USER_APPLICATION_STATUS_QUERY = gql`
  query CHECK_USER_APPLICATION_STATUS_QUERY($jobId: ID!) {
    me {
      id
      role {
        id
        name
      }
      applications(where: { job: { id: $jobId } }) {
        id
      }
      resumes {
        id
      }
    }
  }
`;

const ApplyToJobButton = props => {
  return (
    <Query
      query={CHECK_USER_APPLICATION_STATUS_QUERY}
      variables={{ jobId: props.jobId }}
    >
      {({ error, loading, data }) => {
        if (loading) return <Loader active inline="centered" />;
        if (error) console.log(error);
        if (error) return <p>Something went wrong</p>;
        if (data.me && data.me.role.name !== "CANDIDATE") return null;
        //Check if the user has previously applied
        if (!data.me || data.me.resumes.length === 0)
          return <RegisterToApplyButton jobId={props.jobId} />;

        let userApplied = data.me.applications.length > 0;

        return (
          <React.Fragment>
            <Mutation
              mutation={APPLY_TO_JOB_MUTATION}
              variables={{ jobId: props.jobId }}
            >
              {(applyToJobMutation, { loading, error, called, data }) => {
                if (loading)
                  return (
                    <Loader active inline="centered">
                      Applying...
                    </Loader>
                  );
                if (error)
                  return <p>Something Failed, please try again later.</p>;

                if (data) {
                  //Used to disable the button after user applies
                  userApplied = !!data.createApplication.job;
                }

                return (
                  <Button
                    onClick={applyToJobMutation}
                    fullWidth
                    disabled={userApplied || loading}
                    loading={loading}
                  >
                    {userApplied ? "Applied 😊" : "Apply"}
                  </Button>
                );
              }}
            </Mutation>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default ApplyToJobButton;
