import ApplicantsTable from "../../../../components/applications/ApplicantionsTable";
import DashboardPage from "../../../../components/dashboard/DashboardPage";
import WithAuth from "../../../../components/hoc/WithAuth";

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

export default WithAuth(dashboardApplicationsPerJobPage, [
  { object: "APPLICATION", action: "READ" }
]);
