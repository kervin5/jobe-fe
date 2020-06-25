import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import CreateJobForm from "@/components/jobs/JobMutation/CreateJobForm";

const newJobPage = props => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "JOB", action: "CREATE" }]}
    >
      <DashboardPage nooverflow maxwidth="920px">
        <CreateJobForm />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default newJobPage;
