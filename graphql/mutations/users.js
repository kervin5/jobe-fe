import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $name: String
    $role: ID
    $branch: ID
    $otherBranches: [BranchChangeInput!]
  ) {
    updateUser(
      id: $id
      name: $name
      role: $role
      branch: $branch
      otherBranches: $otherBranches
    ) {
      id
      email
    }
  }
`;
