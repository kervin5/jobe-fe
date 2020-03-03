import React from "react";
import { Tab } from "semantic-ui-react";
import UserBadgesTab from "./Tabs/UserBadgesTab";
import UserJobsTab from "./Tabs/UserJobsTab";
import UserResumesTab from "./Tabs/UserResumesTab";

const panes = [
  {
    menuItem: { key: "users", icon: "handshake outline", content: "Jobs" },
    render: () => (
      <Tab.Pane>
        <UserJobsTab />
      </Tab.Pane>
    )
  },
  // {
  //   menuItem: { key: "badges", icon: "star outline", content: "Badges" },
  //   render: () => (
  //     <Tab.Pane>
  //       <UserBadgesTab />
  //     </Tab.Pane>
  //   )
  // },
  {
    menuItem: {
      key: "resumes",
      icon: "file alternate outline",
      content: "Resumes"
    },
    render: () => (
      <Tab.Pane>
        <UserResumesTab />
      </Tab.Pane>
    )
  }
];

const TabExampleCustomMenuItem = () => <Tab panes={panes} />;

export default TabExampleCustomMenuItem;
