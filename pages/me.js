import WithAuth from "../components/hoc/WithAuth";
import PageSection from "../components/common/Layout/PageSection";
import Container from "../components/common/Layout/Container";
import UserJobList from "../components/me/UserJobList";
import UsefInfo from "../components/me/UserInfo";

const MePage = props => {
  return (
    <PageSection className="DashboardPage" column>
      <Container>
        <UsefInfo />
        <UserJobList />
      </Container>
    </PageSection>
  );
};

export default WithAuth(
  MePage,
  [{ object: "APPLICATION", action: "CREATE" }],
  "/dashboard"
);
