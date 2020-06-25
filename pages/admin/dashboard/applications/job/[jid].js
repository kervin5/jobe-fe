import { useRouter } from "next/router";
import ApplicantsTable from "@/components/applications/ApplicantionsTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const dashboardApplicationsPerJobPage = props => {
  const router = useRouter();
  const { jid } = router.query;
  return (
    <RenderIfLoggedIn
      permissions={[{ object: "APPLICATION", action: "READ" }]}
      redirect
    >
      <DashboardPage maxwidth="1600px">
        <ApplicantsTable jobId={jid} />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardApplicationsPerJobPage;
