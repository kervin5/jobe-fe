import Candidates from "../../../components/candidates/Candidates";
import DashboardPage from "../../../components/dashboard/DashboardPage";
import WithAuth from "../../../components/hoc/WithAuth";

const dashboardCandidatePage = props => {
  return (
    <DashboardPage title="Candidates">
      <Candidates />
    </DashboardPage>
  );
};

export default WithAuth(dashboardCandidatePage);
