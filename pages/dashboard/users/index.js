// import Candidates from "../../../components/candidates/Candidates";
import UsersTable from "../../../components/users/UsersTable";
import DashboardPage from "../../../components/dashboard/DashboardPage";
import WithAuth from "../../../components/hoc/WithAuth";

const dashboardCandidatePage = props => {
  return (
    <DashboardPage title="Users">
      <UsersTable />
    </DashboardPage>
  );
};

export default WithAuth(dashboardCandidatePage);
