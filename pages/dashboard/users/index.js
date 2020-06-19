import UsersTable from "../../../components/users/UsersTable";
import DashboardPage from "../../../components/dashboard/DashboardPage";
import DashboardPageHeader from "../../../components/dashboard/DashboardPageHeader";
import WithAuth from "../../../components/hoc/WithAuth";

const dashboardCandidatePage = props => {
  return (
    <DashboardPage title="Users">
      {/* <DashboardPageHeader>
      
      </DashboardPageHeader> */}
      <UsersTable />
    </DashboardPage>
  );
};

export default WithAuth(dashboardCandidatePage, [
  { object: "USER", action: "CREATE" }
]);
