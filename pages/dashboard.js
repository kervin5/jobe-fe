import Layout from "../components/common/Layout/Layout";
import PageSection from "../components/common/Layout/PageSection";
import WithAuth from "../components/hoc/WithAuth";

const dashboardPage = props => {
  return (
    <Layout title={"Home Page"} hideNav>
      <PageSection className="HomePage" column fullHeight>
        <p>Dashboard</p>
      </PageSection>
    </Layout>
  );
};

export default WithAuth(dashboardPage);
