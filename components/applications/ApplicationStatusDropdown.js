import React from "react";
import { Dropdown } from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export const applicationStatusOptions = [
  {
    key: "New",
    text: "New",
    value: "NEW"
  },

  {
    key: "Viewed",
    text: "Viewed",
    value: "VIEWED"
  },
  {
    key: "Reviewing",
    text: "Reviewing",
    value: "REVIEWING"
  },
  {
    key: "Contacted",
    text: "Contacted",
    value: "CONTACTED"
  },
  {
    key: "Hired",
    text: "Hired",
    value: "HIRED"
  },
  {
    key: "Archived",
    text: "Archived",
    value: "ARCHIVED"
  }
];

const UPDATE_APPLICATION_STATUS_MUTATION = gql`
  mutation UPDATE_APPLICATION_STATUS_MUTATION(
    $id: ID!
    $status: ApplicationStatus!
  ) {
    updateApplicationStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

const JobApplicationStatusDropdown = ({
  applicationId,
  status,
  refetchQueries
}) => {
  return (
    <Mutation
      mutation={UPDATE_APPLICATION_STATUS_MUTATION}
      refetchQueries={refetchQueries || []}
    >
      {(changeApplicationStatusMutation, { error, loading, data }) => {
        return (
          <div className={!status || status === "NEW" ? "New" : ""}>
            <Dropdown
              placeholder="Application Status"
              fluid
              selection
              options={applicationStatusOptions}
              defaultValue={status || "NEW"}
              onChange={(e, data) =>
                changeApplicationStatusMutation({
                  variables: { id: applicationId, status: data.value }
                })
              }
            />
            <style jsx>{`
              div {
                min-width: 150px;
              }

              .New {
                box-shadow: 0px 0px 5px -2px rgba(13, 125, 145, 1);
              }
            `}</style>
          </div>
        );
      }}
    </Mutation>
  );
};

JobApplicationStatusDropdown.defaultProps = {
  status: "NEW"
};

export default JobApplicationStatusDropdown;
