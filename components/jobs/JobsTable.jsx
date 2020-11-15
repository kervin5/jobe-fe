import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import moment from "moment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CheckIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import { OrderByHeader } from "@/common/UI/Tables/Table";
import DeleteJobButton from "@/components/jobs/JobMutation/DeleteJobButton";
import variables from "@/common/globalVariables";
import { ALL_JOBS_GRID, JOBS_GRID_COUNT_QUERY } from "@/graphql/queries/jobs";
import appText from "@/lang/appText";

////New imports
import TableGraphql from "@/common/UI/Tables/TableGraphqlWithQuery";
import DropdownGraphqlInput from "@/common/UI/Input/CustomInput/DropdownGraphqlInput";

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
  return isChecked ? <CheckIcon /> : null;
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
        Titulo
      </OrderByHeader>
    ),
    author: (
      <OrderByHeader column="author" action={setOrderBy} activeColumn={orderBy}>
        Autor
      </OrderByHeader>
    ),
    status: (
      <OrderByHeader column="status" action={setOrderBy} activeColumn={orderBy}>
        Estado
      </OrderByHeader>
    ),
    location: (
      <OrderByHeader
        column="location"
        action={setOrderBy}
        activeColumn={orderBy}
      >
        Locación
      </OrderByHeader>
    ),
    branch: (
      <OrderByHeader column="branch" action={setOrderBy} activeColumn={orderBy}>
        Sucursal
      </OrderByHeader>
    ),
    applications: (
      <OrderByHeader
        column="applications"
        action={setOrderBy}
        activeColumn={orderBy}
      >
        Aplicaciones
      </OrderByHeader>
    ),
    perks: (
      <OrderByHeader column="perks" action={setOrderBy} activeColumn={orderBy}>
        Beneficios
      </OrderByHeader>
    ),
    views: (
      <OrderByHeader column="views" action={setOrderBy} activeColumn={orderBy}>
        Vistas
      </OrderByHeader>
    ),
    created: (
      <OrderByHeader
        column={`"Job"."createdAt"`}
        action={setOrderBy}
        activeColumn={orderBy}
      >
        Creado
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
          <FormControl>
            <InputLabel>{appText.objects.status.singular}</InputLabel>
            <Select
              labelId="application-status"
              id="application-status-select"
              value={status}
              onChange={(e) => statusChangeHandler(e.target.value)}
            >
              {[
                { key: "All", text: "Todos", value: "ALL" },
                ...statusOptions,
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
            graphql={{
              query: `query BRANCHES_QUERY {
                    branchesByUser {
                      id
                      name
                    }
                  }`,
            }}
          />

          <Link href="/admin/jobs/new" passHref>
            <Button as="a">
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
          <a>{job.applications}</a>
        </Link>
      ) : (
        job.applications
      ),
    perks: job.perks,
    branch: job.branch,
    created: moment(job.createdAt).format("MM/DD/YYYY"),

    actions: (
      <div>
        <Link {...getPreviewLink(job)}>
          <Button
            as="a"
            icon="eye"
            color={job.status !== "POSTED" ? "primary" : "secondary"}
            href={getPreviewLink(job).as}
          >
            Ver
          </Button>
        </Link>
        <Link href="/admin/jobs/[jid]/edit" as={`/admin/jobs/${job.id}/edit`}>
          <Button
            as="a"
            icon="edit"
            color="primary"
            href={`/admin/jobs/${job.id}/edit`}
          >
            Editar
          </Button>
        </Link>
        <DeleteJobButton jobId={job.id} refetchQueries={refetchQueries} />
      </div>
    ),
  };
}
const getPreviewLink = (job) => {
  return { href: "/admin/jobs/[jid]", as: `/admin/jobs/${job.id}` };
};

export default memo(JobsTable, (prevProps, newProps) => {
  return prevProps.status === newProps.status;
});
