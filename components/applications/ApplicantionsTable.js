import React, { useState } from "react";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import Link from "next/link";
import { Dropdown, Input, Button } from "semantic-ui-react";
import moment from "moment";
import EempactStatusLabel from "@/components/users/EempactStatusLabel";
import { take } from "@/root/config";
import { applicationStatusOptions } from "./ApplicationStatusDropdown";

import Table from "@/common/UI/Table";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";
import ApplicationsCountWarning from "./ApplicationsCountWarning";

const ALL_APPLICATIONS_QUERY = gql`
  query ALL_APPLICATIONS_QUERY(
    $take: Int!
    $skip: Int!
    $jobId: String
    $status: [ApplicationStatus!]
    $terms: String!
  ) {
    applications(
      where: {
        job: { id: { equals: $jobId } }
        status: { in: $status }
        OR: [
          {
            job: {
              OR: [
                { title: { contains: $terms } }
                { location: { name: { contains: $terms } } }
                { branch: { name: { contains: $terms } } }
              ]
            }
          }
          {
            user: {
              OR: [
                { name: { contains: $terms } }
                { email: { contains: $terms } }
              ]
            }
          }
        ]
      }
      take: $take
      skip: $skip
    ) {
      id
      createdAt
      status

      user {
        name
        eEmpact {
          id
          assignments
        }
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
        branch {
          id
          name
        }

        author {
          id
          name
          email
        }
      }
    }
  }
`;

export const USER_APPLICATION_CONNECTION_QUERY = gql`
  query USER_APPLICATION_CONNECTION_QUERY(
    $jobId: String
    $status: [ApplicationStatus!]
    $terms: String!
  ) {
    applicationsConnection(
      where: {
        job: { id: { equals: $jobId } }
        status: { in: $status }
        OR: [
          {
            job: {
              OR: [
                { title: { contains: $terms } }
                { location: { name: { contains: $terms } } }
                { branch: { name: { contains: $terms } } }
              ]
            }
          }
          {
            user: {
              OR: [
                { name: { contains: $terms } }
                { email: { contains: $terms } }
              ]
            }
          }
        ]
      }
    )
  }
`;

const queriesToRefetch = ({ jobId, skip, terms }) => {
  const queries = [];
  ["NEW", "VIEWED", "REVIEWING", "CONTACTED", "HIRED", "ARCHIVED"].forEach(
    defaultStatus => {
      queries.push({
        query: USER_APPLICATION_CONNECTION_QUERY,
        variables: { jobId, status: [defaultStatus], terms }
      });

      queries.push({
        query: ALL_APPLICATIONS_QUERY,
        variables: {
          take,
          skip,
          status: [defaultStatus],
          terms
        }
      });
    }
  );

  queries.push({
    query: USER_APPLICATION_CONNECTION_QUERY,
    variables: {
      jobId,
      status: ["NEW", "VIEWED", "REVIEWING", "CONTACTED"],
      terms
    }
  });

  queries.push({
    query: ALL_APPLICATIONS_QUERY,
    variables: {
      take,
      skip,
      status: ["NEW", "VIEWED", "REVIEWING", "CONTACTED"],
      terms
    }
  });

  return queries;
};

const ApplicantTable = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [terms, setTerms] = useState("");
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
    setCurrentPage(1);
  };

  return (
    <>
      <ApplicationsCountWarning />

      <Query
        query={USER_APPLICATION_CONNECTION_QUERY}
        ssr={false}
        variables={{
          jobId: "" || props.jobId,
          status,
          terms
        }}
      >
        {userApplicationData => {
          if (userApplicationData.error) return <p>Something went wrong ...</p>;

          return (
            <Query
              query={ALL_APPLICATIONS_QUERY}
              variables={{
                take,
                skip: (currentPage - 1) * take,
                jobId: "" || props.jobId,
                status,
                terms
              }}
            >
              {({ error, loading, data }) => {
                if (error) return <p>Something went wrong...</p>;

                let applications = [];

                data?.applications.forEach(application => {
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
                    branch: application.job.branch.name,
                    owner: application.job.author.email,
                    applied: moment(application.createdAt).format("MM/DD/YYYY"),

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
                          skip: (currentPage - 1) * take,
                          terms
                        })}
                      />
                    ),
                    eempact: (
                      <EempactStatusLabel data={application.user.eEmpact} />
                    ),
                    actions: (
                      <Button
                        as="a"
                        icon="eye"
                        color="green"
                        onClick={e => {
                          e.preventDefault();
                          window.open("/admin/applications/" + application.id);
                        }}
                      />
                    )
                  });
                });

                const count =
                  userApplicationData?.data?.applicationsConnection ?? 0;

                return (
                  <Table
                    data={applications}
                    page={currentPage}
                    loading={loading}
                    count={count}
                    take={take}
                    turnPageHandler={turnPageHandler}
                    toolbar={
                      <>
                        <Input
                          icon="search"
                          placeholder="Search..."
                          onChange={e => setTerms(e.target.value)}
                        />
                        <Dropdown
                          placeholder="Application Status"
                          selection
                          options={[
                            { key: "All", text: "All", value: "ALL" },
                            ...applicationStatusOptions
                          ]}
                          defaultValue={"ALL"}
                          onChange={(e, data) =>
                            statusChangeHandler(data.value)
                          }
                        />
                      </>
                    }
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
