import ApplicantionsTable from "@/components/applications/ApplicantionsTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import ApplicationsCountWarning from "@/components/applications/ApplicationsCountWarning";
import appText from "@/lang/appText";

const dashboardApplicationsPage = (props) => {
  return (
    <RenderIfLoggedIn
      permissions={[{ object: "JOB", action: "CREATE" }]}
      redirect
    >
      <DashboardPage
        maxwidth="1600px"
        title={appText.objects.application.plural}
      >
        <ApplicationsCountWarning />
        <ApplicantionsTable />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardApplicationsPage;
