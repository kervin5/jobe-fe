import { gql } from "@apollo/client";

export const INCREMENT_JOB_VIEW_COUNT_MUTATION = gql`
  mutation INCREMENT_JOB_VIEW_COUNT_MUTATION($id: String!) {
    incrementJobViewCount(id: $id) {
      id
      views
    }
  }
`;
