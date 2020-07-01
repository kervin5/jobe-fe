import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { gql } from "@apollo/client";
import { Mutation } from "@apollo/react-components";
import { APPLICATION_NOTES_QUERY } from "./ApplicationHistoryFeed";

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
  refetchQueries,
  absolute
}) => {
  const [currentStatus, setCurrentStatus] = useState(status || "NEW");
  return (
    <Mutation
      mutation={UPDATE_APPLICATION_STATUS_MUTATION}
      refetchQueries={(refetchQueries || []).concat({
        query: APPLICATION_NOTES_QUERY,
        variables: { id: applicationId }
      })}
    >
      {(changeApplicationStatusMutation, { error, loading, data }) => {
        return (
          <div
            className={
              "ApplicationStatusDropdown " +
              (!status || status === "NEW" ? "New" : "")
            }
          >
            <Dropdown
              placeholder="Application Status"
              selection
              options={applicationStatusOptions}
              value={status}
              fluid
              onChange={(e, data) => {
                if (data.value !== "NEW" && data.value !== "VIEWED") {
                  setCurrentStatus(data.value);
                  changeApplicationStatusMutation({
                    variables: { id: applicationId, status: data.value }
                  });
                }
              }}
            />
            <style jsx>{`
              .ApplicationStatusDropdown {
                min-width: 100px;
                display: inline-block;
                position: ${absolute ? "absolute" : "static"};
                top: 0;
                right: 0;
              }

              .New {
                box-shadow: 0px 0px 5px -2px rgba(13, 125, 145, 1);
              }

              .ApplicationStatusDropdown :global(.ui.dropdown > .text) {
                font-weight: bold;
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
