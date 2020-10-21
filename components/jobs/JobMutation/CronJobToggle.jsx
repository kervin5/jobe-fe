import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import Checkbox from "@material-ui/core/Checkbox";
import InformationButton from "@/common/UI/InformationButton";
import appText from "@/lang/appText";

const JOB_CRON_TASK_QUERY = gql`
  query JOB_CRON_TASK_QUERY($jobId: String!) {
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
  const [toggleCronTaskMutation, { error, loading }] = useMutation(
    checked ? REMOVE_JOB_CRON_TASK_MUTATION : ADD_JOB_CRON_TASK_MUTATION,
    {
      variables: { jobId },
      refetchQueries: [{ query: JOB_CRON_TASK_QUERY, variables: { jobId } }],
    }
  );

  return (
    <>
      <Checkbox
        label={appText.messages.job.jobRecurring}
        disabled={disabled || loading}
        checked={checked}
        onChange={async (e, data) => await toggleCronTaskMutation()}
      />
      <InformationButton
        title={appText.messages.attention}
        message={appText.messages.job.byEnablingRecurring}
      />
    </>
  );
};

const CronJobToggleData = ({ jobId }) => {
  const { error, loading, data } = useQuery(JOB_CRON_TASK_QUERY, {
    variables: { jobId },
  });
  return (
    <div className="field">
      <CronJobToggle
        disabled={loading}
        checked={!!(data && data.job.cronTask)}
        jobId={jobId}
      />
    </div>
  );
};

export default CronJobToggleData;
