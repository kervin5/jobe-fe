import styled from "styled-components";
import PageSection from "@/common/Layout/PageSection";
import Title from "@/common/UI/Title";
import PageTitle from "@/common/Layout/PageTitle";

const StyledDashboardPage = styled.div`
  &.DashboardPage {
    padding: 50px;
    width: 100%;
    min-height: 100%;
  }
`;

const dashboardPage = props => {
  return (
    <PageSection nopadding>
      <StyledDashboardPage className="DashboardPage">
        <PageTitle>
          {props.title ? `${props.title} - Dashboard ` : "Dashboard"}
        </PageTitle>
        <Title>{props.title || "Dashboard"}</Title>
        {props.children}
      </StyledDashboardPage>
    </PageSection>
  );
};

export default dashboardPage;
// export default dashboardPage;
