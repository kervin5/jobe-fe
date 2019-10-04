import DashboardPage from "../../../../components/dashboard/DashboardPage";
import JobPreview from "../../../../components/jobs/JobMutation/JobPreview";
import WithAuth from "../../../../components/hoc/WithAuth";

const SingleJobView = props => {
  return (
    <DashboardPage title="Job Preview">
      <JobPreview jobId={props.jobId} />
    </DashboardPage>
  );
}; //eof

SingleJobView.getInitialProps = async function({ query }) {
  const { jid } = query;
  const slugParts = jid.split("-");
  const jobId = slugParts[slugParts.length - 1];

  return { jobId };
};

export default WithAuth(SingleJobView, [{ object: "JOB", action: "EDIT" }]);
