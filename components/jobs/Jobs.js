import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../../config";
import JobList from "./JobList/JobList";
import Button from "../common/UI/Button";
import Loader from "../common/UI/Animated/Loader";

const ALL_JOBS_QUERY = gql`
  query ALL_JOBS_QUERY($perPage: Int!, $skip: Int!) {
    jobs(
      first: $perPage
      skip: $skip
      orderBy: createdAt_DESC
      where: { status: POSTED }
    ) {
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
  query SEARCH_JOBS_QUERY(
    $q: String!
    $location: String!
    $category: String
    $perPage: Int!
    $skip: Int!
  ) {
    jobs(
      first: $perPage
      skip: $skip
      orderBy: createdAt_DESC
      where: {
        title_contains: $q
        status: POSTED
        location: { name_contains: $location }
        categories_some: { name_contains: $category }
      }
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

    // if (this.props.q && this.props.location) {
    query = SEARCH_JOBS_QUERY;
    // }

    return (
      <div>
        <Query
          query={query}
          variables={{
            location: this.props.location || "",
            q: this.props.q || "",
            category: this.props.category || "",
            perPage,
            skip: 0
          }}
        >
          {({ data, error, loading, fetchMore }) => {
            if (loading) return <Loader />;
            if (error) return <p>Error: {error.message}</p>;
            const endReached = data.jobs.length % perPage !== 0;
            return (
              <React.Fragment>
                <JobList jobs={data.jobs} />
                {!endReached && data.jobs.length > 0 && (
                  <Button
                    fullWidth
                    onClick={() => {
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
