import React from "react";
import SideMenu from "@/common/UI/Navigation/SideMenu";
import appText from "@/lang/appText";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';


const sections = {
  Home: {
    label: appText.objects.dashboard.singular,
    path: "/admin/dashboard",
    icon: DashboardIcon,
  },
  Applications: {
    label: appText.objects.application.plural,
    path: "/admin/applications",
    icon: ThumbUpIcon,
  },
  Jobs: {
    label: appText.objects.job.plural,
    path: "/admin/jobs",
    icon: WorkIcon,
  },
  Candidates: {
    label: appText.objects.candidate.plural,
    path: "/admin/candidates",
    icon: PersonIcon,
  },
  Users: {
    label: appText.objects.user.plural,
    path: "/admin/users",
    icon: PeopleIcon,
    permissions: [{ action: "READ", object: "USER" }],
  },
};

const AdminSideMenu = ({ open, close }) => {
  return (
    <SideMenu
      open={open}
      close={close}
      options={Object.keys(sections).map(
        (sectionName) => sections[sectionName]
      )}
    />
  );
};

export default AdminSideMenu;
