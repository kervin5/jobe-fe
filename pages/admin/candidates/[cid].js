import { useRouter } from "next/router";
import CandidateProfile from "@/components/candidates/CandidateProfile";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import Container from "@/components/common/Layout/Container";
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
        <Container>
          <CandidateProfile userId={cid} />
        </Container>
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardCandidatePage;
