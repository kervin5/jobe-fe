import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../../config";
import JobList from "./JobList/JobList";

const ALL_JOBS_QUERY = gql`
  query ALL_JOBS_QUERY($perPage: Int!) {
    jobs(first: $perPage, orderBy: createdAt_DESC) {
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
            q: this.props.q || "",
            perPage
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            let jobs = [];

            //This is done to join jobs from multiple locations if search is performed
            if (this.props.q && this.props.location) {
              data.locations.forEach(location => {
                jobs = jobs.concat(location.jobs);
              });
            } else {
              jobs = data.jobs;
            }
            return (
              <React.Fragment>
                <JobList jobs={jobs} />
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Jobs;
