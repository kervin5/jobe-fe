import ApplicantionsTable from "../../../components/applications/ApplicantionsTable";
import DashboardPage from "../../../components/dashboard/DashboardPage";
import WithAuth from "../../../components/hoc/WithAuth";

const dashboardApplicationsPage = props => {
  return (
    <DashboardPage>
      <ApplicantionsTable />
    </DashboardPage>
  );
};

export default WithAuth(dashboardApplicationsPage, [
  { object: "JOB", action: "CREATE" }
]);
