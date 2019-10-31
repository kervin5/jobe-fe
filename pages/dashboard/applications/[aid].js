import DashboardPage from "../../../components/dashboard/DashboardPage";
import WithAuth from "../../../components/hoc/WithAuth";
import SingleJobApplication from "../../../components/applications/SingleJobApplication";

const dashboardApplicationsPerJobPage = props => {
  return (
    <DashboardPage title="Application">
      <SingleJobApplication applicationId={props.applicationId} />
    </DashboardPage>
  );
};

dashboardApplicationsPerJobPage.getInitialProps = async args => {
  const { aid } = args.query;
  return { applicationId: aid };
};

export default WithAuth(dashboardApplicationsPerJobPage, [
  { object: "APPLICATION", action: "READ" }
]);
