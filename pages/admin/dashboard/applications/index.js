import ApplicantionsTable from "@/components/applications/ApplicantionsTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import WithAuth from "@/components/hoc/WithAuth";

const dashboardApplicationsPage = props => {
  return (
    <DashboardPage maxwidth="1600px" title="Applications">
      <ApplicantionsTable />
    </DashboardPage>
  );
};

export default WithAuth(dashboardApplicationsPage, [
  { object: "JOB", action: "CREATE" }
]);
