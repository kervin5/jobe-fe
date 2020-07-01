import { useRouter } from "next/router";
import CandidateProfile from "@/components/candidates/CandidateProfile";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const dashboardCandidatePage = props => {
  const router = useRouter();
  const { cid } = router.query;
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "CREATE" }]}
    >
      <DashboardPage title="Candidate Profile">
        <CandidateProfile userId={cid} />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardCandidatePage;
