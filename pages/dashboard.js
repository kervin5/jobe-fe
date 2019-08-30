import { useState } from "react";
import PageSection from "../components/common/Layout/PageSection";
// import WithAuth from "../components/hoc/WithAuth";
import WithAuth from "../components/hoc/WithAuth";
import ButtonsBar from "../components/common/UI/Navigation/ButtonsBar";

import Container from "../components/common/Layout/Container";
import DashboardHome from "../components/dashboard/DashboardHome/DashboardHome";

import SideMenu from "../components/common/UI/Navigation/SideMenu";

const dashboardPage = props => {
  // const [componentInView, setComponentInView] = useState(<p>Dashboard</p>);
  return (
    <WithAuth>
      <SideMenu />
      <PageSection className="DashboardPage" column>
        <ButtonsBar />
        {/* {componentInView} */}
        {/* oNLY TOUCH CONTAINER CHILDREN */}
        <Container>
          <DashboardHome />
        </Container>
      </PageSection>
    </WithAuth>
  );
};

const applicants = () => <p>Applicants</p>;
const jobs = () => <p>Jobs</p>;
// const applicants = () => <p>Home</p>;

export default dashboardPage;
// export default dashboardPage;
