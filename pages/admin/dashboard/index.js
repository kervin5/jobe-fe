import DashboardHome from "@/components/admin/dashboard/DashboardHome/DashboardHome";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const dashboardPage = props => {
  return (
    <RenderIfLoggedIn
      redirect="/user/login"
      permissions={[{ object: "JOB", action: "CREATE" }]}
    >
      <DashboardPage>
        <DashboardHome />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardPage;
