import ApplicantionsTable from "@/components/applications/ApplicantionsTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const dashboardApplicationsPage = props => {
  return (
    <RenderIfLoggedIn
      permissions={[{ object: "JOB", action: "CREATE" }]}
      redirect
    >
      <DashboardPage maxwidth="1600px" title="Applications">
        <ApplicantionsTable />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardApplicationsPage;
