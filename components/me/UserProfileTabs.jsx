import React from "react";
import Tabs from "@/common/UI/Tabs";
import UserApplicationsTab from "./Tabs/UserApplicationsTab";
import UserJobsTab from "./Tabs/UserJobsTab";
import UserResumesTab from "./Tabs/UserResumesTab";
import appText from "@/lang/appText";

const UserProfileTabs = ({ userId, hideApplications }) => {
  return (
    <Tabs
      tabs={[
        {
          label: appText.objects.job.plural,
          content: <UserJobsTab userId={userId} />,
        },
        {
          label: appText.objects.resume.plural,
          content: <UserResumesTab userId={userId} />,
        },
        ...(hideApplications
          ? []
          : [
              {
                label: appText.objects.application.plural,
                content: <UserApplicationsTab userId={userId} />,
              },
            ]),
      ]}
    />
  );
};

export default UserProfileTabs;
