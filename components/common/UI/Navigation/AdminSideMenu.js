import React from "react";
import SideMenu from "@/common/UI/Navigation/SideMenu";
import appText from "@/lang/appText";

const sections = {
  Home: {
    label: appText.objects.dashboard.singular,
    path: "/admin/dashboard",
    icon: "home",
  },
  Applications: {
    label: appText.objects.application.plural,
    path: "/admin/applications",
    icon: "copy outline",
  },
  Jobs: {
    label: appText.objects.job.plural,
    path: "/admin/jobs",
    icon: "briefcase",
  },
  Candidates: {
    label: appText.objects.candidate.plural,
    path: "/admin/candidates",
    icon: "users",
  },
  Users: {
    label: appText.objects.user.plural,
    path: "/admin/users",
    icon: "user",
    permissions: [{ action: "READ", object: "USER" }],
  },
};

const AdminSideMenu = ({ open }) => {
  return (
    <SideMenu
      open={open}
      options={Object.keys(sections).map(
        (sectionName) => sections[sectionName]
      )}
    />
  );
};

export default AdminSideMenu;
