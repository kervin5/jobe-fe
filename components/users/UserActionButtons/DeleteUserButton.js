import React, { useState } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { Button, Modal, Icon } from "semantic-ui-react";

const DELETE_USER_MUTATION = gql`
  mutation DELETE_USER_MUTATION($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const DeleteUserButton = ({ message, userId, refetchQueries }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Mutation
      mutation={DELETE_USER_MUTATION}
      variables={{ id: userId }}
      refetchQueries={refetchQueries}
    >
      {(deleteUserMutation, { error, loading, data }) => {
        return (
          <Modal
            open={open}
            trigger={
              <Button icon color="red" onClick={openModal}>
                <Icon name="times" />
              </Button>
            }
            dimmer="blurring"
            header="Be careful! 👀"
            content={message}
            actions={[
              {
                key: "user-delete-button",
                content: "Yes",
                negative: true,
                onClick: () => {
                  deleteUserMutation().then(res => {
                    if (res.data.deleteUser.id) {
                      closeModal();
                    }
                  });
                }
              },
              {
                key: "cancer-user-delete-button",
                content: "Cancel",
                positive: true,
                onClick: closeModal
              }
            ]}
          />
        );
      }}
    </Mutation>
  );
};

export default DeleteUserButton;
