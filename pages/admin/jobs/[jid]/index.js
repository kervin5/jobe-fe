import { useRouter } from "next/router";
import { Grid, Image } from "semantic-ui-react";
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
      <DashboardPage title="Job Information">
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <JobPreview jobId={jid} />
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
