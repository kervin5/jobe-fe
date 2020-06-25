import Router from "next/router";
import PageSection from "@/common/Layout/PageSection";
import SideMenu from "@/common/UI/Navigation/SideMenu";
import Title from "@/common/UI/Title";
import PageTitle from "@/common/Layout/PageTitle";

const dashboardPage = props => {
  const sections = {
    Home: {
      label: "Home",
      path: "/admin/dashboard",
      icon: "home"
    },
    Applications: {
      label: "Applications",
      path: "/admin/dashboard/applications",
      icon: "copy outline"
    },
    Jobs: {
      label: "Jobs",
      path: "/admin/dashboard/jobs",
      icon: "briefcase"
    },
    Candidates: {
      label: "Candidates",
      path: "/admin/dashboard/candidates",
      icon: "users"
    },
    Users: {
      label: "Users",
      path: "/admin/dashboard/users",
      icon: "user",
      permissions: [{ action: "READ", object: "USER" }]
    }
  };

  const handleItemClick = name => {
    Router.push(sections[name].path);
  };

  return (
    <PageSection className="DashboardPage" nopadding>
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
            padding: 50px;
            width: 100%;
          }
        `}
      </style>
    </PageSection>
  );
};

export default dashboardPage;
// export default dashboardPage;
