import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import JobPreview from "@/components/jobs/JobMutation/JobPreview";
import SingleJobStatsCards from "@/components/jobs/SingleJobStatsCards";
import JobActivityFeed from "@/components/jobs/JobActivityFeed";
import JobStatusHeader from "@/components/jobs/JobStatusHeader";
import TransformerContainer from "@/common/Layout/TransformerContainer";
import appText from "@/lang/appText";

const SingleJobView = (props) => {
  const router = useRouter();
  const { jid } = router.query;

  return (
    <RenderIfLoggedIn
      permissions={[{ object: "JOB", action: "CREATE" }]}
      redirect
    >
      <DashboardPage title={appText.objects.job.information}>
        <Grid container>
          <Grid item>
            <JobStatusHeader jobId={jid} />
            <TransformerContainer padding margin>
              <SingleJobStatsCards jobId={jid} />
              <JobActivityFeed jobId={jid} />
            </TransformerContainer>
          </Grid>
          <Grid item>
            <JobPreview jobId={jid} />
          </Grid>
        </Grid>
      </DashboardPage>
    </RenderIfLoggedIn>
  );
}; //eof

export default SingleJobView;
