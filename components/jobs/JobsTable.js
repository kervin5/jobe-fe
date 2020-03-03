import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import {
  Button,
  Placeholder,
  Loader,
  Input,
  Select,
  Icon,
  Label
} from "semantic-ui-react";
import gql from "graphql-tag";
import { perPage } from "../../config";
import SortableTable from "../common/UI/SortableTable";
import DeleteJobButton from "../jobs/JobMutation/DeleteJobButton";
import variables from "../common/globalVariables";
import moment from "moment";

export const USER_JOBS_QUERY = gql`
  query USER_JOBS_QUERY(
    $perPage: Int!
    $skip: Int!
    $query: String = ""
    $status: [JobStatus!]
  ) {
    protectedJobs(
      first: $perPage
      skip: $skip
      where: { title_contains: $query, status_in: $status }
      orderBy: updatedAt_DESC
    ) {
      id
      title
      status
      updatedAt
      cronTask {
        id
      }
      author {
        id
        name
      }
      location {
        id
        name
      }
      status
      applications {
        id
        status
      }
      branch {
        id
        name
      }
    }
  }
`;

const USER_JOBS_CONNECTION_QUERY = gql`
  query USER_JOBS_CONNECTION_QUERY($query: String = "", $status: [JobStatus!]) {
    protectedJobsConnection(
      where: { title_contains: $query, status_in: $status }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const allStatus = ["DRAFT", "POSTED", "EXPIRED", "PENDING"];
const options = ["ALL", ...allStatus].map((stat, index) => ({
  key: stat + index,
  text: stat,
  value: stat
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

const JobsTable = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState(allStatus);

  const handleTurnPage = pageNumber => {
    setCurrentPage(parseInt(pageNumber));
  };

  const handleFieldChange = (e, field = "query") => {
    if (field === "query") {
      setSearchValue(e.target.value);
    } else {
      setCurrentPage(1);
      if (e.value === "ALL") {
        setStatus(allStatus);
      } else {
        setStatus([e.value]);
      }
    }
  };

  return (
    <>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={e => handleFieldChange(e)}
      />
      <Select
        options={options}
        defaultValue="ALL"
        onChange={(e, data) => handleFieldChange(data, "status")}
      />
      <Query
        query={USER_JOBS_CONNECTION_QUERY}
        ssr={false}
        variables={{ query: searchValue, status }}
      >
        {userJobsData => {
          if (userJobsData.error) return <p>Something went wrong...</p>;
          if (userJobsData.loading) return <Loader />;
          if (!userJobsData.data) return <p>Please wait</p>;
          return (
            <Query
              query={USER_JOBS_QUERY}
              variables={{
                perPage,
                skip: (currentPage - 1) * perPage,
                query: searchValue,
                status
              }}
              ssr={false}
            >
              {({ data, error, loading }) => {
                if (loading)
                  return (
                    <Placeholder fluid>
                      <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  );
                if (error) return <p>Something Failed...</p>;

                //Get jobs from branch if user has access
                const dataForTable = data.protectedJobs.map(job => {
                  // job.recurring  = !!job.cronTask;
                  // delete job.cronTask;
                  return {
                    ...job,
                    location: job.location.name,
                    updated: moment(job.updatedAt).format("MM/DD/YYYY"),
                    branch: job.branch.name,
                    recurring: <CheckMark checked={!!job.cronTask} />,
                    cronTask: null
                  };
                });

                const jobsCount =
                  userJobsData.data.protectedJobsConnection.aggregate.count;
                return (
                  <>
                    <SortableTable
                      page={currentPage}
                      loading={loading}
                      count={jobsCount}
                      perPage={perPage}
                      turnPageHandler={handleTurnPage}
                      data={injectActionsColumn(dataForTable)}
                      exclude={["updatedAt", "cronTask"]}
                    />
                  </>
                );
              }}
            </Query>
          );
        }}
      </Query>
    </>
  );
};

const injectActionsColumn = data => {
  return data.map(record => {
    const activeApplications = record.applications.filter(
      application => !["HIRED", "ARCHIVED"].includes(application.status)
    );

    return {
      ...record,

      status: (
        <p>
          {record.status.toLowerCase()}
          <style jsx>{`
            p {
              font-weight: bold;
              color: ${record.status !== "POSTED"
                ? variables.accentColor2
                : variables.accentColor1};
              text-transform: capitalize;
            }
          `}</style>
        </p>
      ),
      applications:
        record.applications.length > 0 ? (
          <Link
            href={"/dashboard/applications/job/[jid]"}
            as={"/dashboard/applications/job/" + record.id}
          >
            <a>
              {activeApplications.length > 0 ? (
                <Label
                  content={`${activeApplications.length}`}
                  color={
                    activeApplications.length < 30
                      ? "green"
                      : activeApplications.length < 40
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
          <Label content={record.applications.length} color="grey" />
        ),
      author: record.author.name,
      actions: (
        <Button.Group>
          <Link {...getPreviewLink(record)}>
            <Button
              as="a"
              icon="eye"
              color={record.status !== "POSTED" ? "blue" : "green"}
              href={getPreviewLink(record).as}
            />
          </Link>
          <Link
            href="/dashboard/jobs/edit/[jid]"
            as={`/dashboard/jobs/edit/${record.id}`}
          >
            <Button
              as="a"
              icon="edit"
              color="yellow"
              href={`/dashboard/jobs/edit/${record.id}`}
            />
          </Link>
          <DeleteJobButton
            jobId={record.id}
            refetchQueries={[
              { query: USER_JOBS_CONNECTION_QUERY, variables: { query: " " } },
              {
                query: USER_JOBS_CONNECTION_QUERY,
                variables: { perPage, skip: 0, query: " " }
              }
            ]}
          />
        </Button.Group>
      )
    };
  });
};

const getPreviewLink = job => {
  if (job.status !== "POSTED") {
    return {
      href: "/dashboard/jobs/preview/[jid]",
      as: `/dashboard/jobs/preview/${job.id}`
    };
  } else {
    return { href: "/jobs/[jid]", as: `/jobs/${job.id}` };
  }
};

export default JobsTable;
