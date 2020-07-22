import { gql } from "@apollo/client";

export const ALL_PERKS_QUERY = gql`
  query ALL_PERKS_QUERY($take: Int!, $skip: Int!) {
    perks(take: $take, skip: $skip, orderBy: { createdAt: desc }) {
      id
      name
      status
      jobs {
        id
      }
    }
  }
`;

export const PERKS_CONNECTION_QUERY = gql`
  query PERKS_CONNECTION_QUERY {
    perksConnection
  }
`;
