import React from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";
import EditUserForm from "@/components/users/UserMutation/EditUserForm";
import appText from "@/lang/appText";

const EditUserButton = (props) => (
  <Modal
    trigger={
      <Button icon color="yellow">
        <Icon name="pencil" />
      </Button>
    }
    closeIcon
  >
    <Modal.Header>
      {appText.actions.edit} {appText.objects.user.singular}
    </Modal.Header>
    <Modal.Content image>
      {/* <Image wrapped size="medium" src="/images/avatar/large/rachel.png" /> */}
      <Modal.Description>
        <Header>{appText.messages.validation.enterDetails}</Header>
        <EditUserForm
          userId={props.userId}
          refetchQueries={props.refetchQueries}
        />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default EditUserButton;
