import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import Modal from "@/common/UI/Modal";
import IconButton from "@material-ui/core/IconButton";

import CheckIcon from "@material-ui/icons/Check";

const ACTIVATE_PERK_MUTATION = gql`
  mutation ACTIVATE_PERK_MUTATION($id: ID!) {
    activatePerk(id: $id) {
      id
    }
  }
`;

const ActivatePerkButton = ({ message, perkId, refetchQueries }) => {
  const [open, setOpen] = useState(false);
  const [activatePerkMutation, { error, loading, data }] = useMutation(
    ACTIVATE_PERK_MUTATION,
    {
      variables: { id: perkId },
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
      header="Atención! 👀"
      actions={[
        {
          key: "user-delete-button",
          content: "Yes",
          negative: true,
          onClick: () => {
            activatePerkMutation().then((res) => {
              if (res.data.activatePerk.id) {
                closeModal();
              }
            });
          },
        },
        {
          key: "cancer-user-delete-button",
          content: "Cancel",
          positive: true,
          onClick: closeModal,
        },
      ]}
    >
      {message}
    </Modal>
  );
};

export default ActivatePerkButton;
