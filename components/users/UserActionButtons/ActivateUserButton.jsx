import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import Modal from "@/common/UI/Modal";

const ACTIVATE_USER_MUTATION = gql`
  mutation ACTIVATE_USER_MUTATION($id: ID!) {
    activateUser(id: $id) {
      id
    }
  }
`;

const ActivateUserButton = ({ message, userId, refetchQueries }) => {
  const [open, setOpen] = useState(false);
  const [activateUserMutation, { error, loading, data }] = useMutation(
    ACTIVATE_USER_MUTATION,
    {
      variables: { id: userId },
      refetchQueries,
    }
  );
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Modal
      open={open}
      trigger={
        <IconButton onClick={openModal}>
          <CheckIcon />
        </IconButton>
      }
      dimmer="blurring"
      header="Cuidado! 👀"
      content={message}
      actions={[
        {
          key: "user-delete-button",
          content: "Si",
          negative: true,
          onClick: () => {
            activateUserMutation().then((res) => {
              if (res.data.activateUser.id) {
                closeModal();
              }
            });
          },
        },
        {
          key: "cancer-user-delete-button",
          content: "Cancelar",
          positive: true,
          onClick: closeModal,
        },
      ]}
    />
  );
};

export default ActivateUserButton;
