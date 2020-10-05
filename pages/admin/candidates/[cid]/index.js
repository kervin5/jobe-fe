import { useRouter } from "next/router";
import CandidateProfile from "@/components/candidates/CandidateProfile";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import Container from "@/common/Layout/Container";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import appText from "@/lang/appText";

const dashboardCandidatePage = (props) => {
  const router = useRouter();
  const { cid } = router.query;
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "CREATE" }]}
    >
      <DashboardPage title={appText.objects.profile.candidate}>
        <Container>
          <CandidateProfile userId={cid} />
        </Container>
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardCandidatePage;
