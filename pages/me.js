import SEO from "@/components/SEO";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import PageSection from "@/components/common/Layout/PageSection";
import Container from "@/components/common/Layout/Container";
import UserProfileTabs from "@/components/me/UserProfileTabs";
import UserProfileHeader from "@/components/me/UserProfileHeader";

const MePage = props => {
  return (
    <RenderIfLoggedIn
      permissions={[{ object: "APPLICATION", action: "CREATE" }]}
      redirect="/admin/dashboard"
    >
      <PageSection className="DashboardPage" column>
        <SEO
          description="Login to your profile to start your job search with myexactjobs. Browse through hundreds of job openings nationally. Exact Staff has the job opportunity you have been looking for so Apply Today!"
          title="User Profile - Exact Staff National Job Board: Find a Job Today! "
        />
        <Container>
          <UserProfileHeader />
          <UserProfileTabs />
        </Container>
      </PageSection>
    </RenderIfLoggedIn>
  );
};

export default MePage;
