import React, { useState } from "react";
import { Query } from "react-apollo";
import { Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { perPage } from "../../config";
import Loader from "../common/UI/Animated/Loader";
import Table from "../common/UI/Table";
import Router from "next/router";

const USER_JOBS_QUERY = gql`
  query USER_JOBS_QUERY($perPage: Int!, $skip: Int!) {
    me {
      id
      jobs(first: $perPage, skip: $skip) {
        id
        title
        location {
          name
        }
        status
      }
    }
  }
`;

const USER_JOBS_CONNECTION_QUERY = gql`
  query USER_JOBS_CONNECTION_QUERY {
    jobsConnectionPerUser {
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
        if (userJobsData.error) <p>Something went wrong...</p>;
        if (userJobsData.loading) <Loader />;
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
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Something Failed...</p>;
              if (!data.me) return <p>Unauthorized</p>;
              const dataForTable = data.me.jobs.map(job => {
                return {
                  ...job,
                  location: job.location.name
                };
              });
              return (
                <Table
                  page={currentPage}
                  count={
                    userJobsData.data.jobsConnectionPerUser.aggregate.count
                  }
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
      actions: (
        <Button.Group>
          <Button
            icon="eye"
            color="green"
            onClick={e => Router.push(`/jobs/${record.id}`)}
          />
          <Button
            icon="edit"
            color="yellow"
            onClick={e => Router.push(`/jobs/edit/${record.id}`)}
          />
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

export default JobsTable;
