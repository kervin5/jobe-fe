import React, { PureComponent } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../../config";
import JobList from "./JobList/JobList";
import Button from "../common/UI/Button";

const ALL_JOBS_QUERY = gql`
  query ALL_JOBS_QUERY($perPage: Int!, $skip: Int!) {
    jobs(first: $perPage, skip: $skip, orderBy: createdAt_DESC) {
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
    jobs(
      where: { title_contains: $q, location: { name_starts_with: $location } }
    ) {
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
            perPage,
            skip: 0
          }}
        >
          {({ data, error, loading, fetchMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            const endReached = data.jobs.length % perPage !== 0;
            return (
              <React.Fragment>
                <JobList jobs={data.jobs} />
                {!endReached && (
                  <Button
                    fullWidth
                    click={() => {
                      fetchMore({
                        variables: {
                          skip: data.jobs.length,
                          perPage
                        },
                        updateQuery(prev, { fetchMoreResult }) {
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            jobs: [...prev.jobs, ...fetchMoreResult.jobs]
                          });
                        }
                      });
                    }}
                  >
                    View More
                  </Button>
                )}
                {endReached && (
                  <p className="BottomMessage">That's all for now 😊</p>
                )}
              </React.Fragment>
            );
          }}
        </Query>
        <style jsx>{`
          .BottomMessage {
            text-align: center;
            font-weight: bold;
            font-size: 1.2em;
          }
        `}</style>
      </div>
    );
  }
}

export default Jobs;
