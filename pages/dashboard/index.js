import DashboardHome from "../../components/dashboard/DashboardHome/DashboardHome";
import DashboardPage from "../../components/dashboard/DashboardPage";
import WithAuth from "../../components/hoc/WithAuth";

const dashboardPage = props => {
  return (
    <DashboardPage>
      <DashboardHome />
    </DashboardPage>
  );
};

export default WithAuth(dashboardPage);
