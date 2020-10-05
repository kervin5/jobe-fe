import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Form } from "semantic-ui-react";
import moment from "moment";
import EempactStatusLabel from "@/components/users/EempactStatusLabel";
import { take } from "@/root/config";
import { applicationStatusOptions } from "./ApplicationStatusDropdown";
import appText from "@/lang/appText";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";
import DropdownGraphqlInput from "@/common/UI/Input/CustomSemanticInput/DropdownGraphqlInput";
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

  const branchChangeHandler = (e, data) => {
    setBranch(data.value);
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
            <a target="_blank">{application.job.title}</a>
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
        eempact: <EempactStatusLabel data={application.user.eEmpact} />,
        actions: (
          <Link
            href={"/admin/applications/[aid]"}
            as={"/admin/applications/" + application.id}
            target="_blank"
            passHref
          >
            <Button as="a" icon="eye" color="green" target="_blank" />
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
        <Form>
          <Form.Group>
            <Form.Select
              label={appText.objects.status.singular}
              placeholder="Application Status"
              selection
              options={[
                { key: "All", text: "All", value: "ALL" },
                ...applicationStatusOptions,
              ]}
              value={status}
              onChange={(e, data) => statusChangeHandler(data.value)}
            />
            <DropdownGraphqlInput
              onChange={branchChangeHandler}
              name="branch"
              label={appText.objects.branch.singular}
              placeholder={appText.messages.validation.select}
              showAllOption
              defaultValue="ALL"
              graphql={{
                query: `query BRANCHES_QUERY {
              branchesByUser {
                id
                name
              }
            }`,
              }}
            />
          </Form.Group>
        </Form>
      }
    />
  );
};

export default ApplicationsTable;
