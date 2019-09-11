import ApplicantsTable from "../../../components/applications/ApplicantsTable";
import DashboardPage from "../../../components/dashboard/DashboardPage";

const dashboardApplicationsPage = props => {
  return (
    <DashboardPage>
      <ApplicantsTable />
    </DashboardPage>
  );
};

export default dashboardApplicationsPage;
