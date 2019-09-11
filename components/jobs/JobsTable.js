import React, { useState } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import { Button, Placeholder, Loader } from "semantic-ui-react";
import gql from "graphql-tag";
import { perPage } from "../../config";
import Table from "../common/UI/Table";

const JOBS_FIELDS = `(first: $perPage, skip: $skip) {
  id
  title
  status
  author {
    name
  }
  location {
    name
  }
  status
  applications {
    id
  }
}`;

const USER_JOBS_QUERY = gql`
  query USER_JOBS_QUERY($perPage: Int!, $skip: Int!) {
    me {
      id
      jobs ${JOBS_FIELDS}

      branch {
        id
        jobs ${JOBS_FIELDS}
      }
    }
  }
`;

const USER_JOBS_CONNECTION_QUERY = gql`
  query USER_JOBS_CONNECTION_QUERY {
    jobsConnection {
      aggregate {
        count
      }
    }
  }
`;

const JobsTable = props => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleTurnPage = pageNumber => {
    setCurrentPage(parseInt(pageNumber));
  };

  return (
    <Query query={USER_JOBS_CONNECTION_QUERY} ssr={false}>
      {userJobsData => {
        if (userJobsData.error) return <p>Something went wrong...</p>;
        if (userJobsData.loading) return <Loader />;
        if (!userJobsData.data) return <p>Please wait</p>;
        return (
          <Query
            query={USER_JOBS_QUERY}
            variables={{
              perPage,
              skip: (currentPage - 1) * perPage
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
              if (!data.me) return <p>Please wait</p>;

              //Get jobs from branch if user has access
              const dataForTable = (data.me.branch
                ? data.me.branch
                : data.me
              ).jobs.map(job => {
                return {
                  ...job,
                  location: job.location.name
                };
              });

              const jobsCount =
                userJobsData.data.jobsConnection.aggregate.count;
              return (
                <Table
                  page={currentPage}
                  loading={loading}
                  count={jobsCount}
                  perPage={perPage}
                  turnPageHandler={handleTurnPage}
                  data={injectActionsColumn(dataForTable)}
                />
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

const injectActionsColumn = data => {
  return data.map(record => {
    return {
      ...record,
      applications:
        record.applications.length > 0 ? (
          <Link
            href={"/dashboard/applications/[jid]"}
            as={"/dashboard/applications/" + record.id}
          >
            <a>{record.applications.length}</a>
          </Link>
        ) : (
          record.applications.length
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
          <Button
            icon="trash"
            color="red"
            onClick={() => alert("Are you sure?")}
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
