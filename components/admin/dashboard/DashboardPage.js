import styled from "styled-components";
import PageSection from "@/common/Layout/PageSection";
import Title from "@/common/UI/Title";
import PageTitle from "@/common/Layout/PageTitle";

const StyledDashboardPage = styled.div`
  &.DashboardPage {
    padding: 0 50px 50px;
    width: 100%;
    min-height: 100%;
  }
`;

const dashboardPage = (props) => {
  return (
    <PageSection>
      <StyledDashboardPage className="DashboardPage">
        <PageTitle>
          {props.title ? `${props.title} - Admin` : "Admin"}
        </PageTitle>
        <Title level={4} capitalize>
          {props.title ? `Admin > ${props.title}` : "Admin"}
        </Title>
        {props.children}
      </StyledDashboardPage>
    </PageSection>
  );
};

export default dashboardPage;
// export default dashboardPage;
