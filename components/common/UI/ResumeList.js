import React from "react";
import { List, Button, Icon } from "semantic-ui-react";
import moment from "moment";
import Title from "../UI/Title";

const resumeList = props => {
  console.log(props.headertext);
  return (
    <>
      <List divided relaxed>
        <List.Icon name="" size="large" verticalAlign="middle" />
        {props.list.map((list, index) => {
          return (
            <List.Item key={list.id}>
              <List.Content>
                <List.Header as="a">
                  <p>{list.title}</p>
                </List.Header>
                <List.Description as="a">
                  <p>
                    Created: {moment(list.file.createdAt).format("MMM Do YYYY")}
                  </p>
                </List.Description>

                <Button
                  icon
                  labelPosition="left"
                  href={list.file.path}
                  target="_blank"
                  floated="right"
                  color="green"
                >
                  <Icon name="download" />
                  Download
                </Button>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </>
  );
};

export default resumeList;
