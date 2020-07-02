import { gql } from "@apollo/client";

export const APPLICATIONS_BY_USER_ID_QUERY = gql`
  query APPLICATIONS_BY_USER_ID_QUERY($id: String!) {
    applications(
      where: { user: { id: { equals: $id } } }
      orderBy: { createdAt: desc }
    ) {
      id
      createdAt
      status
      job {
        id
        title
        type
        description
        minCompensation
        maxCompensation
        location {
          id
          name
          latitude
          longitude
        }
        perks {
          id
          name
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
  }
`;

export const ALL_APPLICATIONS_QUERY = gql`
  query APPLICATIONS_BY_USER_ID_QUERY {
    applications {
      id
      createdAt
      status
      job {
        id
        title
        type
        description
        minCompensation
        maxCompensation
        location {
          id
          name
          latitude
          longitude
        }
        perks {
          id
          name
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
  }
`;
