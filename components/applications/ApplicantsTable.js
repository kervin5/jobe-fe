import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../../config";
import Link from "next/link";

import Table from "../common/UI/Table";
import Loader from "../common/UI/Animated/Loader";
import Button from "../common/UI/Button";

const APPLICATIONS_QUERY = gql`
  query APPLICATIONS_QUERY($perPage: Int!, $skip: Int!, $jobId: ID) {
    me {
      id
      jobs(where: { id: $jobId }) {
        title
        id
        applications(first: $perPage, skip: $skip) {
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
            user {
              id
            }
          }
        }
      }
    }
  }
`;

const USER_APPLICATION_CONNECTION_QUERY = gql`
  query USER_APPLICATION_CONNECTION_QUERY {
    applicationsConnection {
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
    <Query query={USER_APPLICATION_CONNECTION_QUERY} ssr={false}>
      {userApplicationData => {
        if (userApplicationData.error) return <p>Something went wrong ...</p>;
        if (userApplicationData.loading) return <Loader />;

        return (
          <Query
            query={APPLICATIONS_QUERY}
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

              data.me.jobs.forEach(job => {
                job.applications.forEach(application => {
                  applications.push({
                    name: application.user.name,
                    email: (
                      <Link href={`mailto:${application.user.email}`}>
                        <a>{application.user.email}</a>
                      </Link>
                    ),
                    resume: (
                      <Button
                        onClick={e => {
                          e.preventDefault();
                          window.open(application.resume.file.path);
                        }}
                      >
                        Download
                      </Button>
                    )
                  });
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
