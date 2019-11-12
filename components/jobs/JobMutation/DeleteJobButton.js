import React from "react";
import { Mutation } from "react-apollo";
import { Button, Placeholder, Loader, Input } from "semantic-ui-react";
import gql from "graphql-tag";

// const DELETE_JOB_MUTATION = gql`
//   mutation DELETE_JOB_MUTATIO($jobId: ID!) {
//     deleteJob(id: $jobId) {
//       id
//     }
//   }
// `;

const DELETE_JOB_MUTATION = gql`
  mutation POST_JOB_MUTATION($jobId: ID!) {
    updateJob(
      where: { id: $jobId }

      data: { status: DELETED }
    ) {
      id
      title
      status
    }
  }
`;

const DeleteJobButton = ({ jobId, refetchQueries }) => {
  const handleClick = async deleteJobMutation => {
    if (confirm("Are you sure?")) {
      console.log(await deleteJobMutation());
      location.reload();
    }
  };

  return (
    <Mutation
      mutation={DELETE_JOB_MUTATION}
      variables={{ jobId }}
      refetchQueries={refetchQueries}
    >
      {(deleteJobMutation, { error, loading, data }) => {
        return (
          <Button
            icon="trash"
            color="red"
            onClick={() => handleClick(deleteJobMutation)}
          />
        );
      }}
    </Mutation>
  );
};

export default DeleteJobButton;
