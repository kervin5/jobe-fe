import React from "react";
import styled from "styled-components";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditUserButton from "./EditUserButton";
import DeleteUserButton from "./DeleteUserButton";
import ActivateUserButton from "./ActivateUserButton";

const StyledUserActionButtons = styled.div`
  width: 100%;
`;

const UserActionButtons = ({ user, refetchQueries }) => (
  <StyledUserActionButtons className="UserActionButtons">
    <ButtonGroup>
      <EditUserButton userId={user.id} refetchQueries={refetchQueries || []} />
      {user.status === "ACTIVE" ? (
        <DeleteUserButton
          userId={user.id}
          message={`¿Está seguro de que quiere borrar a ${user.name}?`}
          refetchQueries={refetchQueries || []}
        />
      ) : (
        <ActivateUserButton
          userId={user.id}
          message={`¿Esta seguro de que quiere activar a ${user.name}?`}
          refetchQueries={refetchQueries || []}
        />
      )}
    </ButtonGroup>
  </StyledUserActionButtons>
);

export default UserActionButtons;
