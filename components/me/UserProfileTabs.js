import React from "react";
import { Tab } from "semantic-ui-react";
import UserApplicationsTab from "./Tabs/UserApplicationsTab";
import UserJobsTab from "./Tabs/UserJobsTab";
import UserResumesTab from "./Tabs/UserResumesTab";

const UserProfileTabs = ({ userId, hideApplications }) => (
  <Tab
    panes={[
      {
        menuItem: { key: "users", icon: "handshake outline", content: "Jobs" },
        render: () => (
          <Tab.Pane>
            <UserJobsTab userId={userId} />
          </Tab.Pane>
        )
      },
      {
        menuItem: {
          key: "resumes",
          icon: "file alternate outline",
          content: "Resumes"
        },
        render: () => (
          <Tab.Pane>
            <UserResumesTab userId={userId} />
          </Tab.Pane>
        )
      },
      ...(hideApplications
        ? []
        : [
            {
              menuItem: {
                key: "applications",
                icon: "thumbs up outline",
                content: "Applications"
              },
              render: () => (
                <Tab.Pane>
                  <UserApplicationsTab userId={userId} />
                </Tab.Pane>
              )
            }
          ])
    ]}
  />
);

export default UserProfileTabs;
