import DashboardPage from "../../../../components/dashboard/DashboardPage";
import SingleJobListing from "../../../../components/jobs/JobListing/SingleJobListing";

const SingleJobView = props => {
  return (
    <DashboardPage title="Job Preview">
      <SingleJobListing jobId={props.jobId} preview />
    </DashboardPage>
  );
}; //eof

SingleJobView.getInitialProps = async function({ query }) {
  const { jid } = query;
  const slugParts = jid.split("-");
  const jobId = slugParts[slugParts.length - 1];

  return { jobId };
};

export default SingleJobView;
