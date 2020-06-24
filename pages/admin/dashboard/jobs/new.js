import DashboardPage from "@/components/dashboard/DashboardPage";
import WithAuth from "@/components/hoc/WithAuth";
import CreateJobForm from "@/components/jobs/JobMutation/CreateJobForm";

const newJobPage = props => {
  return (
    <DashboardPage nooverflow maxwidth="920px">
      <CreateJobForm />
    </DashboardPage>
  );
};

export default WithAuth(newJobPage, [{ object: "JOB", action: "CREATE" }]);
