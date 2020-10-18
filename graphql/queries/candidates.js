import { gql } from "@apollo/client";

export const CANDIDATES_QUERY = gql`
  query CANDIDATES_QUERY(
    $take: Int
    $skip: Int
    $query: String!
    $skills: [String!]
  ) {
    candidates(
      take: $take
      skip: $skip
      where: {
        OR: [{ name: { contains: $query } }, { email: { contains: $query } }]
        resumes: { some: { skills: { some: { id: { in: $skills } } } } }
      }
    ) {
      id
      name
      email
      phone

      applications {
        id
        status
      }
      resumes(last: 1) {
        file {
          id
          path
        }
        id
        title
        createdAt

        skills {
          id
          name
        }
      }
    }
  }
`;

export const CANDIDATE_QUERY_EXPORT = gql`
  query CANDIDATE_QUERY($query: String!, $skills: [String!]) {
    candidates(
      where: {
        OR: [{ name: { contains: $query } }, { email: { contains: $query } }]
        resumes: { some: { skills: { some: { id: { in: $skills } } } } }
      }
    ) {
      id
      name
      email
    }
  }
`;

export const CANDIDATES_CONNECTION_QUERY = gql`
  query CANDIDATES_CONNECTION_QUERY($query: String!, $skills: [String!]) {
    candidatesConnection(
      where: {
        OR: [{ name: { contains: $query } }, { email: { contains: $query } }]
        resumes: { some: { skills: { some: { id: { in: $skills } } } } }
      }
    )
  }
`;
