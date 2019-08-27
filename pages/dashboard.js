import PageSection from "../components/common/Layout/PageSection";
// import WithAuth from "../components/hoc/WithAuth";
import withAuth from "../lib/withAuth";
import ButtonsBar from "../components/common/UI/Navigation/ButtonsBar";

import Container from "../components/common/Layout/Container";
import DashboardHome from "../components/dashboard/DashboardHome/DashboardHome";

const dashboardPage = props => {
  // const [componentInView, setComponentInView] = useState(<p>Dashboard</p>);

  return (
    <PageSection className="DashboardPage" column>
      <ButtonsBar />
      {/* {componentInView} */}
      <Container>
        <DashboardHome />
      </Container>
    </PageSection>
  );
};

dashboardPage.getInitialProps = async function(props) {
  await withAuth(props);
};
export default dashboardPage;
// export default dashboardPage;
