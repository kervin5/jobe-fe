import { useRouter } from "next/router";
import ApplicantsTable from "@/components/applications/ApplicantionsTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import appText from "@/lang/appText";
import ApplicationStatusCards from "@/components/applications/ApplicationStatusCards";

const dashboardApplicationsPerJobPage = (props) => {
  const router = useRouter();
  const { jid } = router.query;

  return (
    <RenderIfLoggedIn
      permissions={[{ object: "APPLICATION", action: "READ" }]}
      redirect
    >
      <DashboardPage title={appText.objects.application.plural}>
        <ApplicationStatusCards jobId={jid} />
        <ApplicantsTable jobId={jid} />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardApplicationsPerJobPage;
