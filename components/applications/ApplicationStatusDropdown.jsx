import React from "react";
import { useMutation } from "@apollo/client";

import { gql } from "@apollo/client";
import styled from "styled-components";
import { APPLICATION_NOTES_QUERY } from "./ApplicationHistoryFeed";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const applicationStatusOptions = [
  {
    key: "New",
    text: "Nueva",
    value: "NEW",
  },

  {
    key: "Viewed",
    text: "Vista",
    value: "VIEWED",
  },
  {
    key: "Reviewing",
    text: "Revisando",
    value: "REVIEWING",
  },
  {
    key: "Contacted",
    text: "Contactado",
    value: "CONTACTED",
  },
  {
    key: "Hired",
    text: "Contratado",
    value: "HIRED",
  },
  {
    key: "Archived",
    text: "Archivada",
    value: "ARCHIVED",
  },
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

const StyledApplicationStatusDropdown = styled.div`
  .ApplicationStatusDropdown {
    min-width: 100px;
    display: inline-block;
    position: ${(props) => (props.absolute ? "absolute" : "static")};
    top: 0;
    right: 0;
  }

  .New {
    box-shadow: 0px 0px 5px -2px rgba(13, 125, 145, 1);
  }

  .ApplicationStatusDropdown .ui.dropdown > .text {
    font-weight: bold;
  }
`;

const JobApplicationStatusDropdown = ({
  applicationId,
  status,
  refetchQueries,
  absolute,
}) => {
  const classes = useStyles();
  const [
    changeApplicationStatusMutation,
    { error, loading, data },
  ] = useMutation(UPDATE_APPLICATION_STATUS_MUTATION, {
    refetchQueries: (refetchQueries || []).concat({
      query: APPLICATION_NOTES_QUERY,
      variables: { id: applicationId },
    }),
  });

  return (
    <StyledApplicationStatusDropdown
      className={
        "ApplicationStatusDropdown " +
        (!status || status === "NEW" ? "New" : "")
      }
    >
      <FormControl className={classes.formControl}>
        <InputLabel id="application-status-dropdown-label">Age</InputLabel>
        <Select
          labelId="application-status-dropdown-label"
          id="application-status-select"
          value={status}
          onChange={(e) => {
            if (e.target.value !== "NEW" && e.target.value !== "VIEWED") {
              changeApplicationStatusMutation({
                variables: { id: applicationId, status: e.target.value },
              });
            }
          }}
        >
          {applicationStatusOptions.map((option, index) => (
            <MenuItem key={"ApplicationStatus" + index} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StyledApplicationStatusDropdown>
  );
};

JobApplicationStatusDropdown.defaultProps = {
  status: "NEW",
};

export default JobApplicationStatusDropdown;
