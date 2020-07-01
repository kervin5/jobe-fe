import { gql } from "@apollo/client";

export const APPLICATIONS_BY_USER_ID_QUERY = gql`
  query APPLICATIONS_BY_USER_ID_QUERY($id: String!) {
    applications(where: { user: { id: { equals: $id } } }) {
      id
      job {
        id
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
  }
`;
