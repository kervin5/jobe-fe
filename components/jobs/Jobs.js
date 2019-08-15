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

const SEARCH_JOBS_QUERY = gql`
  query SEARCH_JOBS_QUERY($q: String!, $location: String!) {
    locations(where: { name_starts_with: $location }) {
      jobs(where: { title_contains: $q }) {
        id
        title
        description
        minCompensation
        maxCompensation
        type
        location {
          name
        }
      }
    }
  }
`;

class Jobs extends PureComponent {
  render() {
    let query = ALL_JOBS_QUERY;

    if (this.props.q && this.props.location) {
      query = SEARCH_JOBS_QUERY;
    }

    return (
      <div>
        <Query
          query={query}
          ssr={false}
          variables={{
            location: this.props.location || "",
            q: this.props.q || ""
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            let jobs = [];
            if (this.props.q && this.props.location) {
              data.locations.forEach(location => {
                jobs = jobs.concat(location.jobs);
              });
            } else {
              jobs = data.jobs;
            }
            return <JobList jobs={jobs} />;
          }}
        </Query>
      </div>
    );
  }
}

export default Jobs;
