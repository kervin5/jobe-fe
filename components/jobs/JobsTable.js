import React, { useState, useEffect, memo } from "react";
import Link from "next/link";

import moment from "moment";
import { Button, Icon, Label, Form } from "semantic-ui-react";
import { OrderByHeader } from "@/common/UI/Tables/Table";
import DeleteJobButton from "@/components/jobs/JobMutation/DeleteJobButton";
import variables from "@/common/globalVariables";
import { ALL_JOBS_GRID, JOBS_GRID_COUNT_QUERY } from "@/graphql/queries/jobs";
import appText from "@/lang/appText";

////New imports
import TableGraphql from "@/common/UI/Tables/TableGraphqlWithQuery";
import DropdownGraphqlInput from "@/common/UI/Input/CustomSemanticInput/DropdownGraphqlInput";

const jobStatuses = ["DRAFT", "POSTED", "EXPIRED", "PENDING"];

const statusOptions = jobStatuses.map((stat, index) => ({
  key: stat + index,
  text: stat,
  value: stat,
}));

const CheckMark = ({ checked }) => {
  const [isChecked, setIsChecked] = useState(checked);
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  return isChecked ? (
    <p>
      <Icon name="check" color="orange" />
      <style jsx>{`
        p {
          text-align: center;
        }
      `}</style>
    </p>
  ) : null;
};

const JobsTable = (props) => {
  const [status, setStatus] = useState(props.status ?? "ALL");
  const [branch, setBranch] = useState(props.branch ?? "ALL");

  const [orderBy, setOrderBy] = useState(`"Job"."createdAt" DESC`);

  const statusChangeHandler = (status) => {
    setStatus(status);
  };

  const branchChangeHandler = (e, data) => {
    setBranch(data.value);
  };

  useEffect(() => {
    if (props.status) {
      setStatus(props.status);
    }
  }, [props.status]);

  const headers = {
    title: (
      <OrderByHeader column="title" action={setOrderBy} activeColumn={orderBy}>
        Title
      </OrderByHeader>
    ),
    author: (
      <OrderByHeader column="author" action={setOrderBy} activeColumn={orderBy}>
        Author
      </OrderByHeader>
    ),
    status: (
      <OrderByHeader column="status" action={setOrderBy} activeColumn={orderBy}>
        Status
      </OrderByHeader>
    ),
    location: (
      <OrderByHeader
        column="location"
        action={setOrderBy}
        activeColumn={orderBy}
      >
        Location
      </OrderByHeader>
    ),
    branch: (
      <OrderByHeader column="branch" action={setOrderBy} activeColumn={orderBy}>
        Branch
      </OrderByHeader>
    ),
    applications: (
      <OrderByHeader
        column="applications"
        action={setOrderBy}
        activeColumn={orderBy}
      >
        Applications
      </OrderByHeader>
    ),
    perks: (
      <OrderByHeader column="perks" action={setOrderBy} activeColumn={orderBy}>
        Perks
      </OrderByHeader>
    ),
    views: (
      <OrderByHeader column="views" action={setOrderBy} activeColumn={orderBy}>
        Views
      </OrderByHeader>
    ),
    created: (
      <OrderByHeader
        column={`"Job"."createdAt"`}
        action={setOrderBy}
        activeColumn={orderBy}
      >
        Created
      </OrderByHeader>
    ),
  };
  const statusToFilter = status === "ALL" ? jobStatuses : [status];
  const branchToFilter = branch === "ALL" ? undefined : branch;

  return (
    <TableGraphql
      dataQuery={ALL_JOBS_GRID}
      countQuery={JOBS_GRID_COUNT_QUERY}
      rowFormat={formatTableRow}
      variables={{ status: statusToFilter, branch: branchToFilter, orderBy }}
      searchFilter={(value) => ({ query: value })}
      headers={headers}
      toolbar={
        <>
          <Form>
            <Form.Group>
              <Form.Select
                label={appText.objects.status.singular}
                placeholder="Job Status"
                selection
                options={[
                  { key: "All", text: "All", value: "ALL" },
                  ...statusOptions,
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

          <Link href="/admin/jobs/new" passHref>
            <Button positive as="a">
              {appText.actions.new + " " + appText.objects.job.singular}
            </Button>
          </Link>
        </>
      }
    />
  );
};

function formatTableRow(job, refetchQueries) {
  return {
    title: job.title,
    status: (
      <p>
        {job.status.toLowerCase()}
        <style jsx>{`
          p {
            font-weight: bold;
            color: ${job.status !== "POSTED"
              ? variables.accentColor2
              : variables.accentColor1};
            text-transform: capitalize;
          }
        `}</style>
      </p>
    ),
    author: job.author,
    location: job.location,
    views: job.views,
    applications:
      job.applications > 0 ? (
        <Link
          href={"/admin/jobs/[jid]/applications"}
          as={"/admin/jobs/" + job.id + "/applications"}
        >
          <a>
            {job.applications > 0 ? (
              <Label
                content={`${job.applications}`}
                color={
                  job.applications < 30
                    ? "green"
                    : job.applications < 40
                    ? "yellow"
                    : "red"
                }
              />
            ) : (
              <Label content={0} color="grey" />
            )}
          </a>
        </Link>
      ) : (
        <Label content={job.applications} color="grey" />
      ),
    perks: job.perks,
    branch: job.branch,
    created: moment(job.createdAt).format("MM/DD/YYYY"),
    recurring: <CheckMark checked={!!job.cronTask} />,
    actions: (
      <Button.Group>
        <Link {...getPreviewLink(job)}>
          <Button
            as="a"
            icon="eye"
            color={job.status !== "POSTED" ? "blue" : "green"}
            href={getPreviewLink(job).as}
          />
        </Link>
        <Link href="/admin/jobs/[jid]/edit" as={`/admin/jobs/${job.id}/edit`}>
          <Button
            as="a"
            icon="edit"
            color="yellow"
            href={`/admin/jobs/${job.id}/edit`}
          />
        </Link>
        <DeleteJobButton jobId={job.id} refetchQueries={refetchQueries} />
      </Button.Group>
    ),
  };
}
const getPreviewLink = (job) => {
  return { href: "/admin/jobs/[jid]", as: `/admin/jobs/${job.id}` };
};

export default memo(JobsTable, (prevProps, newProps) => {
  return prevProps.status === newProps.status;
});
