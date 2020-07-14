import SEO from "@/components/SEO";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import PageSection from "@/common/Layout/PageSection";
import Container from "@/common/Layout/Container";
import UserProfileTabs from "@/components/me/UserProfileTabs";
import UserProfileHeader from "@/components/users/UserProfileHeader";
import appText from "@/lang/appText";

const MePage = (props) => {
  return (
    <RenderIfLoggedIn
      permissions={[{ object: "APPLICATION", action: "CREATE" }]}
      redirect="/admin/dashboard"
    >
      <PageSection className="DashboardPage" column>
        <SEO
          description={`${appText.seo.pages.me.title}. ${appText.seo.description}!`}
          title={`${appText.objects.profile.user} - ${app.seo.title}!`}
        />
        <Container>
          <UserProfileHeader />
          <UserProfileTabs hideApplications />
        </Container>
      </PageSection>
    </RenderIfLoggedIn>
  );
};

export default MePage;
