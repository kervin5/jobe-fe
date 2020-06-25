import DashboardHome from "@/components/admin/dashboard/DashboardHome/DashboardHome";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import WithAuth from "@/components/hoc/WithAuth";

const dashboardPage = props => {
  return (
    <DashboardPage>
      <DashboardHome />
    </DashboardPage>
  );
};

export default WithAuth(
  dashboardPage,
  [{ object: "JOB", action: "CREATE" }],
  "/"
);
