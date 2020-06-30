import React, { useState } from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { Button, Modal, Icon } from "semantic-ui-react";

const ACTIVATE_PERK_MUTATION = gql`
  mutation ACTIVATE_PERK_MUTATION($id: ID!) {
    inactivatePerk(id: $id) {
      id
    }
  }
`;

const InactivatePerkButton = ({ message, userId, refetchQueries }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Mutation
      mutation={ACTIVATE_PERK_MUTATION}
      variables={{ id: userId }}
      refetchQueries={refetchQueries}
    >
      {(inactivatePerkMutation, { error, loading, data }) => {
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
                key: "perk-inactivate-button",
                content: "Yes",
                negative: true,
                onClick: () => {
                  inactivatePerkMutation().then(res => {
                    if (res.data.inactivatePerk.id) {
                      closeModal();
                    }
                  });
                }
              },
              {
                key: "perk-inactivate-cancel-button",
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

export default InactivatePerkButton;
