import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $name: String
    $role: ID
    $branch: ID
  ) {
    updateUser(id: $id, name: $name, role: $role, branch: $branch) {
      id
      email
    }
  }
`;
