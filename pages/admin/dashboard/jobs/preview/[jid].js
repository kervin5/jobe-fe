import { useRouter } from "next/router";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import JobPreview from "@/components/jobs/JobMutation/JobPreview";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const SingleJobView = props => {
  const router = useRouter();
  const { jid } = router.query;

  return (
    <RenderIfLoggedIn
      permissions={[{ object: "JOB", action: "CREATE" }]}
      redirect
    >
      <DashboardPage title="Job Preview">
        <JobPreview jobId={jid} />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
}; //eof

export default SingleJobView;
