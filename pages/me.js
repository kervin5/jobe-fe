import WithAuth from "../components/hoc/WithAuth";
import PageSection from "../components/common/Layout/PageSection";
import Container from "../components/common/Layout/Container";
import UserProfileTabs from "../components/me/UserProfileTabs";
import UserProfileHeader from "../components/me/UserProfileHeader";

const MePage = props => {
  return (
    <PageSection className="DashboardPage" column>
      <Container>
        <UserProfileHeader />
        <UserProfileTabs />
      </Container>
    </PageSection>
  );
};

export default WithAuth(
  MePage,
  [{ object: "APPLICATION", action: "CREATE" }],
  "/dashboard"
);
