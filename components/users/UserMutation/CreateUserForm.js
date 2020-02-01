import gql from "graphql-tag";
import Form from "../../common/UI/Form";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $email: String!
    $name: String!
    $role: ID!
    $branch: ID!
  ) {
    createUser(name: $name, email: $email, role: $role, branch: $branch) {
      id
      email
    }
  }
`;

const ROLES_QUERY = gql`
  query ROLES_QUERY {
    roles {
      id
      name
    }
  }
`;

const BRANCHES_QUERY = gql`
  query BRANCHES_QUERY {
    branches {
      id
      name
    }
  }
`;

const CreateUserForm = () => {
  const fields = {
    name: {
      type: "text",
      placeholder: "Jhon Doe",
      validation: {}
    },
    email: {
      type: "email",
      placeholder: "recruiter@example.com"
    },
    branch: {
      type: "dropdown",
      placeholder: "Please select a branch",
      options: { query: BRANCHES_QUERY, label: "name", value: "id" }
    },
    role: {
      type: "dropdown",
      placeholder: "Please select a role",
      options: { query: ROLES_QUERY, label: "name", value: "id" }
    }
  };

  return <Form fields={fields} graphql mutation={CREATE_USER_MUTATION} />;
};

export default CreateUserForm;
