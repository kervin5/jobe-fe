import PerksTable from "@/components/perks/PerksTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
// import DashboardPageHeader from "@/components/admin/dashboard/DashboardPageHeader";
import WithAuth from "@/components/hoc/WithAuth";

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
