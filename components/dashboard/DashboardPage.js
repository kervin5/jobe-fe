import Router from "next/router";
import PageSection from "../../components/common/Layout/PageSection";
import WithAuth from "../../components/hoc/WithAuth";
import Container from "../../components/common/Layout/Container";
import SideMenu from "../../components/common/UI/Navigation/SideMenu";
import Title from "../../components/common/UI/Title";
import PageTitle from "../../components/common/Layout/PageTitle";

const dashboardPage = props => {
  const sections = {
    Home: {
      label: "Home",
      path: "/dashboard",
      icon: "home"
    },
    Applications: {
      label: "Applications",
      path: "/dashboard/applications",
      icon: "copy outline"
    },
    Jobs: {
      label: "Jobs",
      path: "/dashboard/jobs",
      icon: "briefcase"
    },
    Users: {
      label: "Users",
      path: "/dashboard/users",
      icon: "user"
    }
  };

  const handleItemClick = name => {
    Router.push(sections[name].path);
  };

  return (
    <PageSection column className="DashboardPage">
      <PageTitle>
        {(props.title && `${props.title} - Dashboard `) || "Dashboard"}
      </PageTitle>
      <SideMenu
        onClick={handleItemClick}
        options={Object.keys(sections).map(
          sectionName => sections[sectionName]
        )}
      />
      <Container>
        <div className="PageContent">
          <Title>{props.title || "Dashboard"}</Title>
          {props.children}
          <style jsx>{`
            .PageContent {
              padding-left: 55px;
            }
          `}</style>
        </div>
      </Container>
    </PageSection>
  );
};

export default dashboardPage;
// export default dashboardPage;
