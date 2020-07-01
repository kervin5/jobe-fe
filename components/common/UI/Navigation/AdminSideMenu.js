import React from "react";
import SideMenu from "@/common/UI/Navigation/SideMenu";

const sections = {
  Home: {
    label: "Home",
    path: "/admin/dashboard",
    icon: "home"
  },
  Applications: {
    label: "Applications",
    path: "/admin/applications",
    icon: "copy outline"
  },
  Jobs: {
    label: "Jobs",
    path: "/admin/jobs",
    icon: "briefcase"
  },
  Candidates: {
    label: "Candidates",
    path: "/admin/candidates",
    icon: "users"
  },
  Users: {
    label: "Users",
    path: "/admin/users",
    icon: "user",
    permissions: [{ action: "READ", object: "USER" }]
  }
};

const AdminSideMenu = ({ open }) => {
  return (
    <SideMenu
      open={open}
      options={Object.keys(sections).map(sectionName => sections[sectionName])}
    />
  );
};

export default AdminSideMenu;
