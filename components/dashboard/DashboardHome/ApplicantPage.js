import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Table from "../../common/UI/Table";
import Loader from "../../common/UI/Animated/Loader";

const APPLICATION_COUNT_QUERY = gql`
  query APPLICATION_COUNT_QUERY($perPage: Int!, $skip: Int!) {
    me {
      id
      jobs {
        title
        id
        applications(first: $perPage, skip: $skip) {
          id
          user {
            name
            id
            email
            location {
              name
            }
            resumes {
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
  }
`;

const USER_JOBS_CONNECTION_QUERY = gql`
query USER_JOBS_CONNECTION_QUERY
  jobsConnectionPerUser {
    aggregate {
      count
    }
  }
`;

const ApplicantPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const turnPageHandler = pageNumber => {
    setCurrentPage(parseInt(pageNumber));
  };

  return (
    <Query query={USER_JOBS_CONNECTION_QUERY} ssr={false}>
      {userApplicationData => {
        if (userApplicationData.error) return <p>Something went wrong ...</p>;
        if (userApplicationData.loading) return <Loader />;
        return (
          <Query
            query={APPLICATION_COUNT_QUERY}
            variables={{ perPage, skip: (currentPage - 1) * perPage }}
          >
            {({ error, loading, data }) => {
              console.log(error);
              if (error) return <p>Something went wrong...</p>;
              if (loading) return <Loader />;
              let applicantData = data.me.jobs[0];
              console.log(applicantData);
              return <Table data={applicantData} page />;
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default ApplicantPage;
