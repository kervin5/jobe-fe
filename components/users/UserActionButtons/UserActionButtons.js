import React from "react";
import Router from "next/router";
import { Button } from "semantic-ui-react";
import EditUserButton from "./EditUserButton";
import DeleteUserButton from "./DeleteUserButton";

const UserActionButtons = ({ userId }) => (
  <div className="UserActionButtons">
    <Button.Group>
      <EditUserButton userId={userId} />
      <DeleteUserButton userId={userId} />
    </Button.Group>
    <style jsx>{`
      .UserActionButtons {
        width: 100%;
      }
    `}</style>
  </div>
);

export default UserActionButtons;
