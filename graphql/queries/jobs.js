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
