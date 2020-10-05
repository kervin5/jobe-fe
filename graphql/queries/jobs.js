import { gql } from "@apollo/client";

export const SINGLE_JOB_QUERY = gql`
  query SINGLE_JOB_QUERY($id: String!) {
    job(where: { id: $id }) {
      id
      title
      description
      disclaimer
      minCompensation
      maxCompensation
      type
      status
      createdAt
      updatedAt
      views
      permalink
      applications(orderBy: { createdAt: desc }) {
        id
        createdAt
        user {
          id
          name
        }
      }
      favorites {
        id
        createdAt
      }
      categories {
        id
        name
      }

      skills {
        id
        name
      }

      perks(where: { status: ACTIVE }) {
        id
        name
      }

      location {
        id
        name
        latitude
        longitude
      }
      branch {
        id
        name
        description
        company {
          id
          name
          description
        }
      }
    }
  }
`;

export const ALL_JOBS_GRID = gql`
  query ALL_JOBS_GRID(
    $skip: Int
    $take: Int
    $orderBy: String
    $query: String
    $status: [String!]
    $branch: [String!]
  ) {
    jobsGrid(
      skip: $skip
      take: $take
      orderBy: $orderBy
      query: $query
      status: $status
      branch: $branch
    ) {
      id
      title
      status
      author
      location
      views
      applications
      perks
      branch
      updatedAt
      createdAt
      cronTask
    }
  }
`;

export const JOBS_GRID_COUNT_QUERY = gql`
  query JOBS_GRID_COUNT_QUERY(
    $query: String = ""
    $status: [String!]
    $branch: [String!]
  ) {
    jobsGridCount(query: $query, status: $status, branch: $branch)
  }
`;
