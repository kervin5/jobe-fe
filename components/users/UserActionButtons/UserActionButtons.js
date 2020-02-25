import React from "react";
import Router from "next/router";
import { Button } from "semantic-ui-react";
import EditUserButton from "./EditUserButton";
import DeleteUserButton from "./DeleteUserButton";

const UserActionButtons = ({ user }) => (
  <div className="UserActionButtons">
    <Button.Group>
      <EditUserButton userId={user.id} />
      <DeleteUserButton
        userId={user.id}
        message={`Are you sure that you want to delete ${user.name}?`}
      />
    </Button.Group>
    <style jsx>{`
      .UserActionButtons {
        width: 100%;
      }
    `}</style>
  </div>
);

export default UserActionButtons;
