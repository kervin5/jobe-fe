import React, { useState } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { Button, Modal, Icon } from "semantic-ui-react";

const ACTIVATE_PERK_MUTATION = gql`
  mutation ACTIVATE_PERK_MUTATION($id: ID!) {
    activatePerk(id: $id) {
      id
    }
  }
`;

const ActivatePerkButton = ({ message, perkId, refetchQueries }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Mutation
      mutation={ACTIVATE_PERK_MUTATION}
      variables={{ id: perkId }}
      refetchQueries={refetchQueries}
    >
      {(activatePerkMutation, { error, loading, data }) => {
        return (
          <Modal
            open={open}
            trigger={
              <Button icon color="green" onClick={openModal}>
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
                  activatePerkMutation().then(res => {
                    if (res.data.activatePerk.id) {
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

export default ActivatePerkButton;
