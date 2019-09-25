import Candidates from "../../../components/Candidates/Candidates";
import DashboardPage from "../../../components/dashboard/DashboardPage";
import WithAuth from "../../../components/hoc/WithAuth";

const dashboardCandidatePage = props => {
  return (
    <DashboardPage>
      <Candidates />
    </DashboardPage>
  );
};

export default WithAuth(dashboardCandidatePage);
