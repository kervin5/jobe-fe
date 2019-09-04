import { useState } from "react";
import PageSection from "../components/common/Layout/PageSection";
// import WithAuth from "../components/hoc/WithAuth";
import WithAuth from "../components/hoc/WithAuth";
import ButtonsBar from "../components/common/UI/Navigation/ButtonsBar";

import Container from "../components/common/Layout/Container";
import DashboardHome from "../components/dashboard/DashboardHome/DashboardHome";

import SideMenu from "../components/common/UI/Navigation/SideMenu";

const dashboardPage = props => {
  const sections = {
    Home: {
      label: "Home",
      component: <DashboardHome />,
      icon: "home"
    },
    Applications: {
      label: "Applications",
      component: <p>Applications</p>,
      icon: "copy outline"
    },
    Jobs: {
      label: "Jobs",
      component: <p>Jobs</p>,
      icon: "briefcase"
    },
    Users: {
      label: "Users",
      component: <p>Users</p>,
      icon: "briefcase"
    }
  };

  const [componentInView, setComponentInView] = useState(sections.Home);

  const handleItemClick = name => {
    setComponentInView(sections[name]);
  };

  return (
    <WithAuth>
      <PageSection column className="DashboardPage">
        <SideMenu
          click={handleItemClick}
          options={Object.keys(sections).map(
            sectionName => sections[sectionName]
          )}
        />
        {/* <ButtonsBar /> */}
        <Container>{componentInView.component}</Container>
      </PageSection>
    </WithAuth>
  );
};

export default dashboardPage;
// export default dashboardPage;
