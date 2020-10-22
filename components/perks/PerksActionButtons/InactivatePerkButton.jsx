import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { gql } from "@apollo/client";
import Modal from "@/common/UI/Modal";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

const ACTIVATE_PERK_MUTATION = gql`
  mutation ACTIVATE_PERK_MUTATION($id: ID!) {
    inactivatePerk(id: $id) {
      id
    }
  }
`;

const InactivatePerkButton = ({ message, userId, refetchQueries }) => {
  const [open, setOpen] = useState(false);
  const [inactivatePerkMutation, { error, loading, data }] = useMutation(
    ACTIVATE_PERK_MUTATION,
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
          <DeleteIcon />
        </IconButton>
      }
      dimmer="blurring"
      header="Cuidado! 👀"
      content={message}
      actions={[
        {
          key: "perk-inactivate-button",
          content: "Yes",
          negative: true,
          onClick: () => {
            inactivatePerkMutation().then((res) => {
              if (res.data.inactivatePerk.id) {
                closeModal();
              }
            });
          },
        },
        {
          key: "perk-inactivate-cancel-button",
          content: "Cancel",
          positive: true,
          onClick: closeModal,
        },
      ]}
    />
  );
};

export default InactivatePerkButton;
