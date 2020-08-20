import UsersTable from "@/components/users/UsersTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import appText from "@/lang/appText";

const dashboardCandidatePage = (props) => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "USER", action: "CREATE" }]}
    >
      <DashboardPage title={appText.objects.user.plural}>
        <UsersTable />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardCandidatePage;
