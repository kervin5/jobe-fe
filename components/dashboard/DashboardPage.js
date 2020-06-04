import Router from "next/router";
import PageSection from "../../components/common/Layout/PageSection";
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
    Candidates: {
      label: "Candidates",
      path: "/dashboard/candidates",
      icon: "users"
    },
    Users: {
      label: "Users",
      path: "/dashboard/users",
      icon: "user",
      permissions: [{ action: "READ", object: "USER" }]
    }
  };

  const handleItemClick = name => {
    Router.push(sections[name].path);
  };

  return (
    <PageSection column className="DashboardPage">
      <SideMenu
        onClick={handleItemClick}
        options={Object.keys(sections).map(
          sectionName => sections[sectionName]
        )}
      />

      <div className="PageContent">
        <PageTitle>
          {(props.title && `${props.title} - Dashboard `) || "Dashboard"}
        </PageTitle>
        <Title>{props.title || "Dashboard"}</Title>
        {props.children}
      </div>
      <style jsx>
        {`
          .PageContent {
            padding-left: 150px;
            padding-right: 50px;
            width: 100%;
          }
        `}
      </style>
    </PageSection>
  );
};

export default dashboardPage;
// export default dashboardPage;
