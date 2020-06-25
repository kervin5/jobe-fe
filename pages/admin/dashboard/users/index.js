import UsersTable from "@/components/users/UsersTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const dashboardCandidatePage = props => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "USER", action: "CREATE" }]}
    >
      <DashboardPage title="Users">
        <UsersTable />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardCandidatePage;
