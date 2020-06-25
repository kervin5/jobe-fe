import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import EditJobForm from "@/components/jobs/JobMutation/EditJobForm";
import WithAuth from "@/components/hoc/WithAuth";

const DashboardEditJobPage = props => {
  return (
    <DashboardPage nooverflow maxwidth="920px">
      <EditJobForm jobId={props.jobId} />
    </DashboardPage>
  );
};

DashboardEditJobPage.getInitialProps = async args => {
  const { jid } = args.query;
  const slugParts = jid.split("-");
  const jobId = slugParts[slugParts.length - 1];
  return { jobId };
};

export default WithAuth(DashboardEditJobPage, [
  { object: "JOB", action: "UPDATE" }
]);
