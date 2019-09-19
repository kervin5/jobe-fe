import CreateUserForm from "../../../components/users/CreateUserForm";
import DashboardPage from "../../../components/dashboard/DashboardPage";
import WithAuth from "../../../components/hoc/WithAuth";

const newJobPage = props => {
  return (
    <DashboardPage title="Add User">
      <CreateUserForm />
    </DashboardPage>
  );
};

export default WithAuth(newJobPage);
