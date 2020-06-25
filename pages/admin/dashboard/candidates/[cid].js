import Candidates from "@/components/candidates/CandidatesTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const dashboardCandidatePage = props => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "CREATE" }]}
    >
      <DashboardPage title="Candidates">
        <Candidates />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardCandidatePage;
