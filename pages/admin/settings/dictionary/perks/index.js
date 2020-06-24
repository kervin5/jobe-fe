import Router from "next/router";
import PerksTable from "../../../../components/perks/PerksTable";
import DashboardPage from "../../../../components/dashboard/DashboardPage";
// import DashboardPageHeader from "../../../../components/dashboard/DashboardPageHeader";
import WithAuth from "../../../../components/hoc/WithAuth";
// import Button from "../../../../components/common/UI/Button";

const dashboardCandidatePage = props => {
  return (
    <DashboardPage title="Perks">
      {/* <DashboardPageHeader>
        
      </DashboardPageHeader> */}
      <PerksTable />
    </DashboardPage>
  );
};

export default WithAuth(dashboardCandidatePage, [
  { object: "JOB", action: "PUBLISH" }
]);
