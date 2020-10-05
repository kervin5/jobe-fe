import React from "react";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import EditUserButton from "./EditUserButton";
import DeleteUserButton from "./DeleteUserButton";
import ActivateUserButton from "./ActivateUserButton";

const UserActionButtons = ({ user, refetchQueries }) => (
  <div className="UserActionButtons">
    <Button.Group>
      {/* <Link
        href="/admin/users/[userId]"
        as={`/admin/users/${user.id}`}
        passHref
      >
        <Button icon="eye" color="green" as="a" />
      </Link> */}
      <EditUserButton userId={user.id} refetchQueries={refetchQueries || []} />
      {user.status === "ACTIVE" ? (
        <DeleteUserButton
          userId={user.id}
          message={`Are you sure that you want to delete ${user.name}?`}
          refetchQueries={refetchQueries || []}
        />
      ) : (
        <ActivateUserButton
          userId={user.id}
          message={`Are you sure that you want to activate ${user.name}?`}
          refetchQueries={refetchQueries || []}
        />
      )}
    </Button.Group>
    <style jsx>{`
      .UserActionButtons {
        width: 100%;
      }
    `}</style>
  </div>
);

export default UserActionButtons;
