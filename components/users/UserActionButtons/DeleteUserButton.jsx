import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import Modal from "@/common/UI/Modal";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const DELETE_USER_MUTATION = gql`
  mutation DELETE_USER_MUTATION($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const DeleteUserButton = ({ message, userId, refetchQueries }) => {
  const [open, setOpen] = useState(false);
  const [deleteUserMutation, { error, loading, data }] = useMutation(
    DELETE_USER_MUTATION,
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
      header="Be careful! 👀"
      content={message}
      actions={[
        {
          key: "user-delete-button",
          content: "Si",
          negative: true,
          onClick: () => {
            deleteUserMutation().then((res) => {
              if (res.data.deleteUser.id) {
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

export default DeleteUserButton;
