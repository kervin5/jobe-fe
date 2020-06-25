import { useRouter } from "next/router";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import EditJobForm from "@/components/jobs/JobMutation/EditJobForm";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const DashboardEditJobPage = props => {
  const router = useRouter();
  const { jid } = router.query;
  const slugParts = jid.split("-");
  const jobId = slugParts[slugParts.length - 1];
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "UPDATE" }]}
    >
      <DashboardPage nooverflow maxwidth="920px">
        <EditJobForm jobId={jobId} />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default DashboardEditJobPage;
