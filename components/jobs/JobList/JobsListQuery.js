import React from "react";
import { useQuery, gql } from "@apollo/client";
import { take } from "@/root/config";
import JobList from "./JobList";
import Button from "@/common/UI/Button";
import Loader from "@/common/UI/Animated/Loader";
import appText from "@/lang/appText";
import { jobsSettings } from "@/root/config";
import styled from "styled-components";

const StyledJobsCards = styled.div`
  .BottomMessage {
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
  }

  padding-bottom: 30px;
`;

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

const JobsCards = (props) => {
  const variables = {
    location: props.location || "",
    query: props.q || "",
    category: props.category || "",
    type: props.type || "",
    radius: props.radius || 5,
    take,
    skip: 0,
  };
  const { error, loading, data, fetchMore } = useQuery(SEARCH_JOBS_QUERY, {
    variables,
  });

  if (loading && !props.jobs) return <Loader />;
  if (error && !props.jobs) return <p>Error: {error.message}</p>;
  const jobs = data?.searchJobs || props.jobs;
  const endReached = jobs.length % take !== 0;

  return (
    <StyledJobsCards>
      <JobList
        jobs={jobs}
        showJobType={jobsSettings.showJobType}
        showPayRate={jobsSettings.showPayRate}
      />
      {!endReached && jobs.length > 0 && (
        <Button
          disabled={loading}
          fullWidth
          onClick={() => {
            fetchMore({
              variables: {
                ...variables,
                skip: jobs.length,
                take,
              },
              updateQuery(prev, { fetchMoreResult }) {
                if (!fetchMoreResult) return prev;
                const [resultKey] = Object.keys(fetchMoreResult);

                return Object.assign({}, prev, {
                  [resultKey]: [
                    ...prev[resultKey],
                    ...fetchMoreResult[resultKey],
                  ],
                });
              },
            });
          }}
        >
          {appText.actions.viewMore}
        </Button>
      )}
      {endReached && (
        <p className="BottomMessage">{appText.messages.thatsAll} 😊</p>
      )}
    </StyledJobsCards>
  );
};

export default JobsCards;
