import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import { Query } from "@apollo/react-components";
import moment from "moment";
import { Button, Input, Select, Icon, Label } from "semantic-ui-react";
import { gql } from "@apollo/client";
import { take } from "@/root/config";
import Table, { OrderByHeader } from "@/common/UI/Tables/Table";
import DeleteJobButton from "@/components/jobs/JobMutation/DeleteJobButton";
import variables from "@/common/globalVariables";
import { ALL_JOBS_GRID } from "@/graphql/queries/jobs";
import appText from "@/lang/appText";
import DownloadCSVButton from "@/common/UI/DownloadCSVButton";

const JOBS_GRID_COUNT_QUERY = gql`
  query JOBS_GRID_COUNT_QUERY($query: String = "", $status: [String!]) {
    jobsGridCount(query: $query, status: $status)
  }
`;

const allStatus = ["DRAFT", "POSTED", "EXPIRED", "PENDING"];
const options = ["ALL", ...allStatus].map((stat, index) => ({
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState(props.status ?? "ALL");
  const [orderBy, setOrderBy] = useState(`"Job"."createdAt" DESC`);

  const handleTurnPage = (pageNumber) => {
    setCurrentPage(parseInt(pageNumber));
  };

  const handleFieldChange = (e, field = "query") => {
    if (field === "query") {
      setSearchValue(e.target.value);
    } else {
      setStatus(e.value);
    }

    setCurrentPage(1);
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
    // updated: (
    //   <OrderByHeader
    //     column={`"Job"."updatedAt"`}
    //     action={setOrderBy}
    //     activeColumn={orderBy}
    //   >
    //     Updated
    //   </OrderByHeader>
    // ),
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
  const statusToFilter = status === "ALL" ? allStatus : [status];
  return (
    <>
      <Query
        query={JOBS_GRID_COUNT_QUERY}
        ssr={false}
        variables={{
          query: searchValue,
          status: statusToFilter,
        }}
      >
        {(userJobsData) => {
          if (userJobsData.error) return <p>Something went wrong...</p>;

          return (
            <Query
              query={ALL_JOBS_GRID}
              variables={{
                take,
                skip: (currentPage - 1) * take,
                query: searchValue,
                orderBy,
                status: statusToFilter,
              }}
              ssr={false}
            >
              {({ data, error, loading }) => {
                if (error) return <p>Something Failed...</p>;

                const dataForTable = data?.jobsGrid.map((job) => {
                  return {
                    ...job,
                    location: job.location,
                    // updated: moment(job.updatedAt).format("MM/DD/YYYY"),
                    created: moment(job.createdAt).format("MM/DD/YYYY"),
                    branch: job.branch,
                    recurring: <CheckMark checked={!!job.cronTask} />,
                    cronTask: null,
                  };
                });

                const jobsCount = userJobsData?.data?.jobsGridCount || 0;
                return (
                  <Table
                    toolbar={
                      <>
                        <div>
                          <Input
                            icon="search"
                            placeholder={appText.actions.search}
                            onChange={(e) => handleFieldChange(e)}
                          />
                          <Select
                            options={options}
                            value={status}
                            onChange={(e, data) =>
                              handleFieldChange(data, "status")
                            }
                          />
                        </div>
                        <div>
                          <DownloadCSVButton
                            queryData={{
                              query: ALL_JOBS_GRID,
                              variables: {
                                query: searchValue,
                                orderBy,
                                status: statusToFilter,
                              },
                            }}
                          />
                          <Link href="/admin/jobs/new" passHref>
                            <Button positive as="a">
                              {appText.actions.new +
                                " " +
                                appText.objects.job.singular}
                            </Button>
                          </Link>
                        </div>
                      </>
                    }
                    page={currentPage}
                    loading={loading}
                    count={jobsCount}
                    take={take}
                    turnPageHandler={handleTurnPage}
                    headers={headers}
                    data={injectActionsColumn(dataForTable, [
                      {
                        query: JOBS_GRID_COUNT_QUERY,
                        variables: {
                          query: searchValue,
                          status: statusToFilter,
                        },
                      },
                      {
                        query: ALL_JOBS_GRID,
                        variables: {
                          take,
                          skip: (currentPage - 1) * take,
                          query: searchValue,
                          orderBy,
                          status: statusToFilter,
                        },
                      },
                    ])}
                    exclude={["updatedAt", "createdAt", "cronTask"]}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    </>
  );
};

const injectActionsColumn = (data, refetchQueries) => {
  if (!data) return null;
  return data.map((record) => {
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
        record.applications > 0 ? (
          <Link
            href={"/admin/jobs/[jid]/applications"}
            as={"/admin/jobs/" + record.id + "/applications"}
          >
            <a>
              {record.applications > 0 ? (
                <Label
                  content={`${record.applications}`}
                  color={
                    record.applications < 30
                      ? "green"
                      : record.applications < 40
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
          <Label content={record.applications} color="grey" />
        ),
      author: record.author,
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
            href="/admin/jobs/[jid]/edit"
            as={`/admin/jobs/${record.id}/edit`}
          >
            <Button
              as="a"
              icon="edit"
              color="yellow"
              href={`/admin/jobs/${record.id}/edit`}
            />
          </Link>
          <DeleteJobButton jobId={record.id} refetchQueries={refetchQueries} />
        </Button.Group>
      ),
    };
  });
};

const getPreviewLink = (job) => {
  // if (job.status !== "POSTED") {
  //   return {
  //     href: "/admin/jobs/[jid]",
  //     as: `/admin/jobs/${job.id}/preview`
  //   };
  // } else {
  return { href: "/admin/jobs/[jid]", as: `/admin/jobs/${job.id}` };
  // }
};

export default memo(JobsTable, (prevProps, newProps) => {
  return prevProps.status === newProps.status;
});
