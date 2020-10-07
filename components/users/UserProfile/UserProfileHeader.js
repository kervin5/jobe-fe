import React from "react";
import { Card } from "semantic-ui-react";
import Avatar from "@/common/UI/Avatar";

const UserProfileHeader = ({ userData }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Avatar name={userData?.name} nomargin />
      </Card.Content>
    </Card>
  );
};

export default UserProfileHeader;
