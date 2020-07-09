import Candidates from "@/components/candidates/CandidatesTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import appText from "@/lang/appText";

const dashboardCandidatePage = (props) => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "CREATE" }]}
    >
      <DashboardPage title={appText.objects.candidate.plural}>
        <Candidates />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardCandidatePage;
