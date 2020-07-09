import CreateUserForm from "@/components/users/UserMutation/CreateUserForm";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import appText from "@/lang/appText";

const newUserPage = (props) => {
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "USER", action: "CREATE" }]}
    >
      <DashboardPage
        title={appText.actions.add + " " + appText.objects.user.singular}
      >
        <CreateUserForm />
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default newUserPage;
