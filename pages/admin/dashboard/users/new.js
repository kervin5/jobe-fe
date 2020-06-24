import CreateUserForm from "../../../components/users/UserMutation/CreateUserForm";
import DashboardPage from "../../../components/dashboard/DashboardPage";
import WithAuth from "../../../components/hoc/WithAuth";

const newJobPage = props => {
  return (
    <DashboardPage title="Add User">
      <CreateUserForm />
    </DashboardPage>
  );
};

export default WithAuth(newJobPage, [{ object: "USER", action: "CREATE" }]);
