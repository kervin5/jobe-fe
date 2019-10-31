import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../../config";
import Link from "next/link";

import Table from "../common/UI/Table";
import Loader from "../common/UI/Animated/Loader";
import Button from "../common/UI/Button";

const ALL_APPLICATIONS_QUERY = gql`
  query ALL_APPLICATIONS_QUERY($perPage: Int!, $skip: Int!, $jobId: ID) {
    applications(where: { job: { id: $jobId } }, first: $perPage, skip: $skip) {
      id
      createdAt
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
  query USER_APPLICATION_CONNECTION_QUERY($jobId: ID) {
    applicationsConnection(where: { job: { id: $jobId } }) {
      aggregate {
        count
      }
    }
  }
`;

const ApplicantTable = props => {
  const [currentPage, setCurrentPage] = useState(1);

  const turnPageHandler = pageNumber => {
    setCurrentPage(parseInt(pageNumber));
  };

  return (
    <Query
      query={USER_APPLICATION_CONNECTION_QUERY}
      ssr={false}
      variables={{
        jobId: "" || props.jobId
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
              jobId: "" || props.jobId
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
                userApplicationData.data.applicationsConnection.aggregate.count;

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
  );
};

export default ApplicantTable;
