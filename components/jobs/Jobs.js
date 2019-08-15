import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import JobList from "./JobList/JobList";

const ALL_JOBS_QUERY = gql`
  query ALL_JOBS_QUERY {
    jobs {
      id
      title
      description
      compensationType
      type
      minCompensation
      maxCompensation
      createdAt
      location {
        name
      }
    }
  }
`;

class Jobs extends PureComponent {
  render() {
    return (
      <div>
        <Query query={ALL_JOBS_QUERY} ssr={false}>
          {({ data, error, loading }) => {
            // console.log(data);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return <JobList jobs={data.jobs} />;
          }}
        </Query>
      </div>
    );
  }
}

export default Jobs;
