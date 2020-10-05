import { gql } from "@apollo/client";

export const ALL_BRANCHES_QUERY = gql`
  query ALL_BRANCHES_QUERY {
    branches {
      id
      name
    }
  }
`;
