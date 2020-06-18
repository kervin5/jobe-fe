import React from "react";
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";
import EditUserForm from "../UserMutation/EditUserForm";

const EditUserButton = props => (
  <Modal
    trigger={
      <Button icon color="yellow">
        <Icon name="pencil" />
      </Button>
    }
    closeIcon
  >
    <Modal.Header>Edit User</Modal.Header>
    <Modal.Content image>
      {/* <Image wrapped size="medium" src="/images/avatar/large/rachel.png" /> */}
      <Modal.Description>
        <Header>Enter the details below</Header>
        <EditUserForm userId={props.userId} />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default EditUserButton;
