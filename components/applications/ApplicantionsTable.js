import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import { Dropdown } from "semantic-ui-react";
import { perPage } from "../../config";
import { applicationStatusOptions } from "./ApplicationStatusDropdown";

import Table from "../common/UI/Table";
import Loader from "../common/UI/Animated/Loader";
import Button from "../common/UI/Button";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";

const ALL_APPLICATIONS_QUERY = gql`
  query ALL_APPLICATIONS_QUERY(
    $perPage: Int!
    $skip: Int!
    $jobId: ID
    $status: [ApplicationStatus!]
  ) {
    applications(
      where: { job: { id: $jobId }, status_in: $status }
      first: $perPage
      skip: $skip
    ) {
      id
      createdAt
      status
      user {
        name
        id
        email
        location {
          name
        }
      }
      resume {
        title
        id
        file {
          path
          createdAt
          id
        }
      }

      job {
        id
        title
        location {
          id
          name
        }
      }
    }
  }
`;

const USER_APPLICATION_CONNECTION_QUERY = gql`
  query USER_APPLICATION_CONNECTION_QUERY(
    $jobId: ID
    $status: [ApplicationStatus!]
  ) {
    applicationsConnection(where: { job: { id: $jobId }, status_in: $status }) {
      aggregate {
        count
      }
    }
  }
`;

const queriesToRefetch = ({ jobId, skip }) => {
  const queries = [];
  ["NEW", "VIEWED", "REVIEWING", "CONTACTED", "HIRED", "ARCHIVED"].forEach(
    defaultStatus => {
      queries.push({
        query: USER_APPLICATION_CONNECTION_QUERY,
        variables: { jobId, status: [defaultStatus] }
      });

      queries.push({
        query: ALL_APPLICATIONS_QUERY,
        variables: {
          perPage,
          skip,
          status: [defaultStatus]
        }
      });
    }
  );

  queries.push({
    query: USER_APPLICATION_CONNECTION_QUERY,
    variables: { jobId, status: ["NEW", "VIEWED", "REVIEWING", "CONTACTED"] }
  });

  queries.push({
    query: ALL_APPLICATIONS_QUERY,
    variables: {
      perPage,
      skip,
      status: ["NEW", "VIEWED", "REVIEWING", "CONTACTED"]
    }
  });

  console.log(queries);
  return queries;
};

const ApplicantTable = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState([
    "NEW",
    "VIEWED",
    "REVIEWING",
    "CONTACTED"
  ]);

  const turnPageHandler = pageNumber => {
    setCurrentPage(parseInt(pageNumber));
  };

  const statusChangeHandler = status => {
    if (status === "ALL") {
      setStatus(["NEW", "VIEWED", "REVIEWING", "CONTACTED"]);
    } else {
      setStatus([status]);
    }
  };

  return (
    <>
      <Dropdown
        placeholder="Application Status"
        fluid
        selection
        options={[
          { key: "All", text: "All", value: "ALL" },
          ...applicationStatusOptions
        ]}
        defaultValue={"ALL"}
        onChange={(e, data) => statusChangeHandler(data.value)}
      />
      <Query
        query={USER_APPLICATION_CONNECTION_QUERY}
        ssr={false}
        variables={{
          jobId: "" || props.jobId,
          status
        }}
      >
        {userApplicationData => {
          if (userApplicationData.error) return <p>Something went wrong ...</p>;
          if (userApplicationData.loading) return <Loader />;

          return (
            <Query
              query={ALL_APPLICATIONS_QUERY}
              variables={{
                perPage,
                skip: (currentPage - 1) * perPage,
                jobId: "" || props.jobId,
                status
              }}
            >
              {({ error, loading, data }) => {
                if (error) return <p>Something went wrong...</p>;
                if (loading) return <Loader />;
                let applications = [];

                data.applications.forEach(application => {
                  applications.push({
                    name: application.user.name,
                    job: (
                      <Link
                        href={"/jobs/[jid]"}
                        as={"/jobs/" + application.job.id}
                      >
                        <a target="_blank">{application.job.title}</a>
                      </Link>
                    ),
                    location: application.job.location.name,
                    email: (
                      <a href={`mailto:${application.user.email}`}>
                        {application.user.email}
                      </a>
                    ),

                    status: (
                      <ApplicationStatusDropdown
                        applicationId={application.id}
                        status={application.status}
                        refetchQueries={queriesToRefetch({
                          jobId: props.jobId || "",
                          skip: (currentPage - 1) * perPage
                        })}
                      />
                    ),
                    application: (
                      <Button
                        onClick={e => {
                          e.preventDefault();
                          window.open(
                            "/dashboard/applications/" + application.id
                          );
                        }}
                      >
                        View
                      </Button>
                    )
                  });
                });

                const count =
                  userApplicationData.data.applicationsConnection.aggregate
                    .count;

                return (
                  <Table
                    data={applications}
                    page={currentPage}
                    loading={loading}
                    count={count}
                    perPage={perPage}
                    turnPageHandler={turnPageHandler}
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

export default ApplicantTable;
