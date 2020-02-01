import React from "react";
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";
import EditUserForm from "../UserMutation/EditUserForm";

const DeleteUserButton = () => (
  <Modal
    trigger={
      <Button icon color="red">
        <Icon name="trash" />
      </Button>
    }
  >
    <Modal.Header>Edit User</Modal.Header>
    <Modal.Content image>
      {/* <Image wrapped size="medium" src="/images/avatar/large/rachel.png" /> */}
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <EditUserForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default DeleteUserButton;
