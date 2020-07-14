import { useRouter } from "next/router";
import JobsTable from "@/components/jobs/JobsTable";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import JobsStatsCards from "@/components/admin/dashboard/DashboardHome/JobsStatsCards";
import appText from "@/lang/appText";

const dashboardPage = (props) => {
  const router = useRouter();
  let status;

  if (router?.query?.status) {
    status = router?.query?.status;
  }

  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "CREATE" }]}
    >
      <DashboardPage title={appText.objects.job.plural}>
        <JobsStatsCards />
        <JobsTable status={status} />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardPage;
