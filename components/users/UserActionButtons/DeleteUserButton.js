import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button, Modal, Icon } from "semantic-ui-react";

const DELETE_USER_MUTATION = gql`
  mutation DELETE_USER_MUTATION($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const updateUserList = (cache, payload) => {
  const jobId = payload.data.addFavorite;
  const data = cache.readQuery({
    query: USER_FAVORITE_STATUS_QUERY,
    variables: { jobId }
  });

  if (data.me) {
    data.me.favorites = [
      {
        __typename: "Favorite",
        id: "TempId",
        job: { __typename: "Job", id: jobId }
      }
    ];
    cache.writeQuery({
      query: USER_FAVORITE_STATUS_QUERY,
      variables: { jobId },
      data
    });
  }
};

const DeleteUserButton = ({ message, userId }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <Mutation
      mutation={DELETE_USER_MUTATION}
      variables={{ id: userId }}
      optimisticResponse={{
        __typename: "Mutation",
        deleteUser: {
          id: userId,
          __typename: "User"
        }
      }}
      udpate={updateUserList}
    >
      {(deleteUserMutation, { error, loading, data }) => {
        return (
          <Modal
            open={open}
            trigger={
              <Button icon color="red" onClick={openModal}>
                <Icon name="trash" />
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
                    console.log(res);
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
