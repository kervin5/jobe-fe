import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Checkbox } from "semantic-ui-react";

const JOB_CRON_TASK_QUERY = gql`
  query JOB_CRON_TASK_QUERY($jobId: ID!) {
    job(where: { id: $jobId }) {
      id
      cronTask {
        id
      }
    }
  }
`;

const ADD_JOB_CRON_TASK_MUTATION = gql`
  mutation ADD_JOB_CRON_TASK_MUTATION($jobId: String!) {
    schedule(id: $jobId)
  }
`;

const REMOVE_JOB_CRON_TASK_MUTATION = gql`
  mutation REMOVE_JOB_CRON_TASK_MUTATION($jobId: String!) {
    unschedule(id: $jobId)
  }
`;

const CronJobToggle = ({ jobId, disabled, checked }) => {
  return (
    <Mutation
      mutation={
        checked ? REMOVE_JOB_CRON_TASK_MUTATION : ADD_JOB_CRON_TASK_MUTATION
      }
      variables={{ jobId }}
      refetchQueries={[{ query: JOB_CRON_TASK_QUERY, variables: { jobId } }]}
    >
      {(toggleCronTaskMutation, { error, loading }) => {
        return (
          <Checkbox
            toggle
            label="Recurring Job"
            disabled={disabled || loading}
            checked={checked}
            onChange={async (e, data) => await toggleCronTaskMutation()}
          />
        );
      }}
    </Mutation>
  );
};

const CronJobToggleData = ({ jobId }) => {
  return (
    <div className="field">
      <Query query={JOB_CRON_TASK_QUERY} variables={{ jobId }}>
        {({ error, loading, data }) => {
          return (
            <CronJobToggle
              disabled={loading}
              checked={!!(data && data.job.cronTask)}
              jobId={jobId}
            />
          );
        }}
      </Query>
    </div>
  );
};

export default CronJobToggleData;
