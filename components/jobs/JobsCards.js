import React from "react";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { take } from "@/root/config";
import JobList from "./JobList/JobList";
import Button from "@/common/UI/Button";
import Loader from "@/common/UI/Animated/Loader";

const SEARCH_JOBS_QUERY = gql`
  query SEARCH_JOBS_QUERY(
    $query: String!
    $location: String!
    $category: String
    $take: Int!
    $type: String
    $skip: Int!
    $radius: Int
  ) {
    searchJobs(
      query: $query
      location: $location
      where: {
        categories: { some: { name: { contains: $category } } }
        type: { contains: $type }
      }
      take: $take
      skip: $skip
      radius: $radius
    ) {
      id
      title
      description
      minCompensation
      maxCompensation
      favorites {
        id
      }
      type
      createdAt
      updatedAt
      location {
        id
        name
      }

      perks(where: { status: ACTIVE }) {
        id
        name
      }
    }
  }
`;

const JobsCards = props => {
  let query = SEARCH_JOBS_QUERY;

  return (
    <div>
      <Query
        query={query}
        variables={{
          location: props.location || "",
          query: props.q || "",
          category: props.category || "",
          type: props.type || "",
          radius: props.radius || 5,
          take,
          skip: 0
        }}
      >
        {({ data, error, loading, fetchMore }) => {
          if (loading && !props.jobs) return <Loader />;
          if (error && !props.jobs) return <p>Error: {error.message}</p>;
          const jobs = data?.jobs || data?.searchJobs || props.jobs;
          const endReached = jobs.length % take !== 0;

          return (
            <React.Fragment>
              <JobList jobs={jobs} />
              {!endReached && jobs.length > 0 && (
                <Button
                  disabled={loading}
                  fullWidth
                  onClick={() => {
                    fetchMore({
                      variables: {
                        skip: jobs.length,
                        take
                      },
                      updateQuery(prev, { fetchMoreResult }) {
                        if (!fetchMoreResult) return prev;
                        if (fetchMoreResult.jobs) {
                          return Object.assign({}, prev, {
                            jobs: [...prev.jobs, ...fetchMoreResult.jobs]
                          });
                        } else {
                          return Object.assign({}, prev, {
                            searchJobs: [
                              ...prev.searchJobs,
                              ...fetchMoreResult.searchJobs
                            ]
                          });
                        }
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

        div {
          padding-bottom: 30px;
        }
      `}</style>
    </div>
  );
};

export default JobsCards;
