import { gql } from "@apollo/client";

export const ME_USER_QUERY = gql`
  query ME_USER_QUERY {
    me {
      id
      name
      createdAt
      resumes {
        id
        title
        createdAt
        file {
          id
          createdAt
          path
        }
      }
      location {
        id
        name
      }
      role {
        id
        name
        permissions {
          id
          object
          actions
        }
      }
    }
  }
`;

export const SINGLE_USER_QUERY = gql`
  query ME_USER_QUERY($id: String!) {
    user(where: { id: $id }) {
      id
      name
      createdAt
      email
      applications {
        id
        createdAt
      }

      location {
        id
        name
      }

      resumes(orderBy: { createdAt: desc }) {
        id
        title
        file {
          id
          path
          createdAt
          updatedAt
        }
      }
    }
  }
`;
