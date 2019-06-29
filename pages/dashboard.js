import Layout from "../components/common/Layout/Layout";
import PageSection from "../components/common/Layout/PageSection";
import WithAuth from "../components/hoc/WithAuth";
import { useState } from "react";
import ButtonsBar from "../components/common/UI/Navigation/ButtonsBar";

const dashboardPage = props => {
  const [componentInView, setComponentInView] = useState(<p>Dashboard</p>);

  return (
    <Layout title={"Dashboard Page"}>
      <PageSection className="DashboardPage" column>
        <ButtonsBar />
        {componentInView}
      </PageSection>
    </Layout>
  );
};

export default WithAuth(dashboardPage);
