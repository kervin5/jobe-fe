import ApplicantsTable from "../../../components/applications/ApplicantsTable";
import DashboardPage from "../../../components/dashboard/DashboardPage";

const dashboardApplicationsPerJobPage = props => {
  return (
    <DashboardPage>
      <ApplicantsTable jobId={props.jobId} />
    </DashboardPage>
  );
};

dashboardApplicationsPerJobPage.getInitialProps = async args => {
  const { jid } = args.query;
  return { jobId: jid };
};

export default dashboardApplicationsPerJobPage;
