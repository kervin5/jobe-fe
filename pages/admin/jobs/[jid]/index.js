import { useRouter } from "next/router";
import { Grid } from "semantic-ui-react";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import JobPreview from "@/components/jobs/JobMutation/JobPreview";
import JobStatsCards from "@/components/jobs/JobStatsCards";
import JobActivityFeed from "@/components/jobs/JobActivityFeed";
import JobStatusHeader from "@/components/jobs/JobStatusHeader";
import TransformerContainer from "@/common/Layout/TransformerContainer";

const SingleJobView = props => {
  const router = useRouter();
  const { jid } = router.query;

  return (
    <RenderIfLoggedIn
      permissions={[{ object: "JOB", action: "CREATE" }]}
      redirect
    >
      <DashboardPage title="Job Information">
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              <JobStatusHeader jobId={jid} />
              <TransformerContainer padding margin>
                <JobStatsCards jobId={jid} />
                <JobActivityFeed jobId={jid} />
              </TransformerContainer>
            </Grid.Column>
            <Grid.Column>
              <JobPreview jobId={jid} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </DashboardPage>
    </RenderIfLoggedIn>
  );
}; //eof

export default SingleJobView;
