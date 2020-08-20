import CompaniesTable from "@/components/companies/CompaniesTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import appText from "@/lang/appText";

const adminCompaniesPage = (props) => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "PUBLISH" }]}
    >
      <DashboardPage title={appText.objects.company.plural}>
        <CompaniesTable />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default adminCompaniesPage;
