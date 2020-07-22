import { useRouter } from "next/router";
import ApplicantionsTable from "@/components/applications/ApplicantionsTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import ApplicationsCountWarning from "@/components/applications/ApplicationsCountWarning";
import appText from "@/lang/appText";
import ApplicationStatusCards from "@/components/applications/ApplicationStatusCards";

const dashboardApplicationsPage = (props) => {
  const { query } = useRouter();

  return (
    <RenderIfLoggedIn
      permissions={[{ object: "JOB", action: "CREATE" }]}
      redirect
    >
      <DashboardPage
        maxwidth="1600px"
        title={
          appText.objects.application.plural +
          (query?.status ? ` > ${query.status}` : "")
        }
      >
        <ApplicationsCountWarning />
        <ApplicationStatusCards />
        <ApplicantionsTable status={query?.status} />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardApplicationsPage;
