import JobCreatorForm from "../../../components/jobs/JobMutation/JobCreatorForm";
import DashboardPage from "../../../components/dashboard/DashboardPage";

const newJobPage = props => {
  return (
    <DashboardPage>
      <JobCreatorForm />
    </DashboardPage>
  );
};

export default newJobPage;
