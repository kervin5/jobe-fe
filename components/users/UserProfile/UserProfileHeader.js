import React from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@/common/UI/Avatar";

const UserProfileHeader = ({ userData }) => {
  return (
    <Paper>
      <Avatar name={userData?.name} nomargin />
    </Paper>
  );
};

export default UserProfileHeader;
