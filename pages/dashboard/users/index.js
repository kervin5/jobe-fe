import Router from "next/router";
import UsersTable from "../../../components/users/UsersTable";
import DashboardPage from "../../../components/dashboard/DashboardPage";
import DashboardPageHeader from "../../../components/dashboard/DashboardPageHeader";
import WithAuth from "../../../components/hoc/WithAuth";
import Button from "../../../components/common/UI/Button";

const dashboardCandidatePage = props => {
  return (
    <DashboardPage title="Users">
      <DashboardPageHeader>
        <Button onClick={() => Router.push("/dashboard/users/new")}>
          Add User
        </Button>
      </DashboardPageHeader>
      <UsersTable />
    </DashboardPage>
  );
};

export default WithAuth(dashboardCandidatePage, [
  { object: "USER", action: "CREATE" }
]);
