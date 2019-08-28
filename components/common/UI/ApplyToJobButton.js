import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { Loader } from "semantic-ui-react";
import PopUp from "./PopUp";
import RegisterForm from "../../users/RegisterForm";
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

const CHECK_USER_APPLICATION_STATUS_QUERY = gql`
  query CHECK_USER_APPLICATION_STATUS_QUERY($jobId: ID!) {
    applicationsConnection(where: { job: { id: $jobId } }) {
      aggregate {
        count
      }
    }
  }
`;

const ApplyToJobButton = props => {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <Query
      query={CHECK_USER_APPLICATION_STATUS_QUERY}
      variables={{ jobId: props.jobId }}
      ssr={false}
    >
      {({ error, loading, data }) => {
        if (loading) return <Loader active inline="centered" />;
        if (error) return <p>Something went wrong</p>;
        //Check if the user has previously applied

        let userApplied = !!(
          data.applicationsConnection &&
          data.applicationsConnection.aggregate.count > 0
        );

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
                    className="button"
                    click={applyToJobMutation}
                    fullWidth
                    disabled={userApplied || loading}
                    loading={loading}
                  >
                    {userApplied ? "Applied 😊" : "Apply"}
                  </Button>
                );
              }}
            </Mutation>

            <PopUp show={showPopUp} changeHandler={setShowPopUp}>
              <RegisterForm onSubmit={() => console.log("Applied")} />
            </PopUp>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default ApplyToJobButton;
