import JobsTable from "@/components/jobs/JobsTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import WithAuth from "@/components/hoc/WithAuth";

const dashboardPage = props => {
  return (
    <DashboardPage title="Jobs">
      <JobsTable />
    </DashboardPage>
  );
};

export default WithAuth(
  dashboardPage,
  [{ object: "JOB", action: "CREATE" }],
  "/"
);
