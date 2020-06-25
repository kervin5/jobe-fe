import CreateUserForm from "@/components/users/UserMutation/CreateUserForm";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const newJobPage = props => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "USER", action: "CREATE" }]}
    >
      <DashboardPage title="Add User">
        <CreateUserForm />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default newJobPage;
