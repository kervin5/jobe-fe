import JobsTable from "@/components/jobs/JobsTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import JobsStatsCards from "@/components/admin/dashboard/DashboardHome/JobsStatsCards";

const dashboardPage = props => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "CREATE" }]}
    >
      <DashboardPage title="Jobs">
        <JobsStatsCards />
        <JobsTable />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardPage;
