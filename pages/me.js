import WithAuth from "../components/hoc/WithAuth";
import PageSection from "../components/common/Layout/PageSection";
import Title from "../components/common/UI/Title";
import { useState } from "react";
import Container from "../components/common/Layout/Container";
import UserJobList from "../components/me/UserJobList";

const MePage = props => {
  return (
    <PageSection className="DashboardPage" column>
      <Container>
        <Title>Your Profile</Title>
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
