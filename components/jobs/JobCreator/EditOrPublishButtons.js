import React from "react";
import { Button, Icon } from "semantic-ui-react";
import gql from "graphql-tag";

function EditOrPublishButtons({ jobId }) {
  return (
    <Button.Group floated="right">
      <Button icon labelPosition="left">
        <Icon name="left arrow" />
        Edit
      </Button>
      <Button.Or />
      <Button
        positive
        icon
        labelPosition="right"
        onClick={e => console.log("click")}
      >
        Publish
        <Icon name="right arrow" />
      </Button>
    </Button.Group>
  );
}

export default EditOrPublishButtons;
