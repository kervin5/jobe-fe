import React, { useState } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { Button, Modal, Icon } from "semantic-ui-react";

const ACTIVATE_USER_MUTATION = gql`
  mutation ACTIVATE_USER_MUTATION($id: ID!) {
    activateUser(id: $id) {
      id
    }
  }
`;

const ActivateUserButton = ({ message, userId, refetchQueries }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Mutation
      mutation={ACTIVATE_USER_MUTATION}
      variables={{ id: userId }}
      refetchQueries={refetchQueries}
    >
      {(activateUserMutation, { error, loading, data }) => {
        return (
          <Modal
            open={open}
            trigger={
              <Button icon positive onClick={openModal}>
                <Icon name="check" />
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
                  activateUserMutation().then(res => {
                    if (res.data.activateUser.id) {
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

export default ActivateUserButton;
