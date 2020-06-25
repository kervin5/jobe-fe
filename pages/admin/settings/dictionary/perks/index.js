import PerksTable from "@/components/perks/PerksTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
// import DashboardPageHeader from "@/components/admin/dashboard/DashboardPageHeader";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const dashboardCandidatePage = props => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "PUBLISH" }]}
    >
      <DashboardPage title="Perks">
        <PerksTable />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardCandidatePage;
