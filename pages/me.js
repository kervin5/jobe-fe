import WithAuth from "../components/hoc/WithAuth";
import PageSection from "../components/common/Layout/PageSection";

import Title from "../components/common/UI/Title";
import { useState } from "react";
// import ButtonsBar from "../components/common/UI/Navigation/ButtonsBar";
import Container from "../components/common/Layout/Container";
import UserJobList from "../components/me/UserJobList";

const MePage = props => {
  const [componentInView, setComponentInView] = useState(<p>Dashboard</p>);
  return (
    <WithAuth>
      <PageSection className="DashboardPage" column>
        {/* <ButtonsBar /> */}
        {/* {componentInView} */}
        <Container>
          <Title>Your Profile</Title>
          <UserJobList />
        </Container>
      </PageSection>
    </WithAuth>
  );
};

export default MePage;
