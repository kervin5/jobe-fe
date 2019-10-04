import ApplicantsTable from "../../../components/applications/ApplicantsTable";
import DashboardPage from "../../../components/dashboard/DashboardPage";
import WithAuth from "../../../components/hoc/WithAuth";

const dashboardApplicationsPage = props => {
  return (
    <DashboardPage>
      <ApplicantsTable />
    </DashboardPage>
  );
};

export default WithAuth(dashboardApplicationsPage, [
  { object: "JOB", action: "CREATE" }
]);
