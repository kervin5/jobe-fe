import JobsTable from "@/components/jobs/JobsTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const dashboardPage = props => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "CREATE" }]}
    >
      <DashboardPage title="Jobs">
        <JobsTable />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardPage;
