import PageSection from "../components/common/Layout/PageSection";
import WithAuth from "../components/hoc/WithAuth";
import { useState } from "react";
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

export default WithAuth(dashboardPage);
// export default dashboardPage;
