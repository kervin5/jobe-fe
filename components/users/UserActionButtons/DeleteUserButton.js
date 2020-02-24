import React from "react";
import { Button, Modal, Icon } from "semantic-ui-react";

const DeleteUserButton = () => (
  <Modal
    trigger={
      <Button icon color="red">
        <Icon name="trash" />
      </Button>
    }
    header="Are you sure?"
    content="Call Benjamin regarding the reports."
    actions={[
      { key: "done", content: "Done", positive: true },
      { key: "done", content: "Done", positive: true }
    ]}
  />
);

export default DeleteUserButton;
