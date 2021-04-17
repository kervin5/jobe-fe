import React, { useState, useEffect } from "react";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import moment from "moment";

import { take } from "@/root/config";
import { applicationStatusOptions } from "./ApplicationStatusDropdown";
import appText from "@/lang/appText";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";
import DropdownGraphqlInput from "@/common/UI/Input/CustomInput/DropdownGraphqlInput";
import TableGraphql from "@/common/UI/Tables/TableGraphqlWithQuery";
import {
  ALL_APPLICATIONS_QUERY,
  USER_APPLICATION_CONNECTION_QUERY,
} from "@/graphql/queries/applications";

const queriesToRefetch = ({ jobId, skip, terms }) => {
  const queries = [];
  ["NEW", "VIEWED", "REVIEWING", "CONTACTED", "HIRED", "ARCHIVED"].forEach(
    (defaultStatus) => {
      queries.push({
        query: USER_APPLICATION_CONNECTION_QUERY,
        variables: { jobId, status: [defaultStatus], terms },
      });

      queries.push({
        query: ALL_APPLICATIONS_QUERY,
        variables: {
          take,
          skip,
          status: [defaultStatus],
          terms,
        },
      });
    }
  );

  queries.push({
    query: USER_APPLICATION_CONNECTION_QUERY,
    variables: {
      jobId,
      status: ["NEW", "VIEWED", "REVIEWING", "CONTACTED"],
      terms,
    },
  });

  queries.push({
    query: ALL_APPLICATIONS_QUERY,
    variables: {
      take,
      skip,
      status: ["NEW", "VIEWED", "REVIEWING", "CONTACTED"],
      terms,
    },
  });

  return queries;
};

const ApplicationsTable = (props) => {
  const [status, setStatus] = useState(props.status ?? "ALL");
  const [branch, setBranch] = useState(props.branch ?? "ALL");

  const statusChangeHandler = (status) => {
    setStatus(status);
  };

  const branchChangeHandler = (e) => {
    console.log(e.target.value);
    setBranch(e.target.value);
  };

  useEffect(() => {
    if (props.status) {
      statusChangeHandler(props.status);
    } else {
      statusChangeHandler(status);
    }
  }, [props.status, status]);

  const statusToFilter =
    status === "ALL" ? ["NEW", "VIEWED", "REVIEWING", "CONTACTED"] : [status];
  const branchToFilter = branch === "ALL" ? undefined : branch;

  return (
    <TableGraphql
      dataQuery={ALL_APPLICATIONS_QUERY}
      countQuery={USER_APPLICATION_CONNECTION_QUERY}
      rowFormat={(application, queries) => ({
        name: application.user.name,
        job: (
          <Link
            href={"/admin/jobs/[jid]"}
            as={"/admin/jobs/" + application.job.id}
          >
            <a href={"/admin/jobs/" + application.job.id}>
              {application.job.title}
            </a>
          </Link>
        ),
        location: application.job.location.name,
        branch: application.job.branch.name,
        owner: application.job.author.email,
        applied: moment(application.createdAt).format("MM/DD/YYYY"),

        email: (
          <a href={`mailto:${application.user.email}`}>
            {application.user.email}
          </a>
        ),
        phone: application.user.phone,
        status: (
          <ApplicationStatusDropdown
            applicationId={application.id}
            status={application.status}
            refetchQueries={queries}
          />
        ),

        actions: (
          <Link
            href={"/admin/applications/[aid]"}
            as={"/admin/applications/" + application.id}
            passHref
          >
            <IconButton aria-label="View Application" target="_blank" as="a">
              <VisibilityIcon />
            </IconButton>
          </Link>
        ),
      })}
      variables={{
        status: statusToFilter,
        branch: branchToFilter,
        jobId: props.jobId,
      }}
      searchFilter={(value) => ({ terms: value })}
      toolbar={
        <>
          <FormControl >
            <InputLabel>{appText.objects.status.singular}</InputLabel>
            <Select
              labelId="application-status"
              id="application-status-select"
              value={status}
              onChange={(e) => statusChangeHandler(e.target.value)}
            >
              {[
                { key: "All", text: "All", value: "ALL" },
                ...applicationStatusOptions,
              ].map((option, index) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DropdownGraphqlInput
            onChange={branchChangeHandler}
            name="branch"
            label={appText.objects.branch.singular}
            placeholder={appText.messages.validation.select}
            showAllOption
            defaultValue="ALL"
            minWidth="200px"
            graphql={{
              query: `query BRANCHES_QUERY {
              branchesByUser {
                id
                name
              }
            }`,
            }}
          />
        </>
      }
    />
  );
};

export default ApplicationsTable;
