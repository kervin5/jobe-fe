import JobCreatorForm from "../../../components/jobs/JobMutation/JobCreatorForm";
import DashboardPage from "../../../components/dashboard/DashboardPage";
import WithAuth from "../../../components/hoc/WithAuth";

const newJobPage = props => {
  return (
    <DashboardPage>
      <JobCreatorForm />
    </DashboardPage>
  );
};

export default WithAuth(newJobPage);
