import gql from "graphql-tag";
import { Query } from "react-apollo";
import Form from "@/common/UI/Form";

const UPDATE_USER_MUTATION = gql`
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

const SINGLE_USER_QUERY = gql`
  query SINGLE_USER_QUERY($id: String!) {
    user(where: { id: $id }) {
      id
      name
      email
      branch {
        id
        name
      }
      role {
        id
        name
      }
    }
  }
`;

const CreateUserForm = props => {
  const fields = {
    name: {
      type: "text",
      placeholder: "Jhon Doe",
      validation: {}
    },
    email: {
      type: "email",
      placeholder: "recruiter@example.com",
      disabled: true
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

  return (
    <Query query={SINGLE_USER_QUERY} variables={{ id: props.userId }}>
      {({ error, loading, data }) => {
        if (loading) return null;
        console.log({ error });
        if (error) return <p>Something went wrong</p>;
        return (
          <Form
            fields={{
              name: { ...fields.name, value: data.user.name },
              email: { ...fields.email, value: data.user.email },
              branch: {
                ...fields.branch,
                ...(data.user.branch ? { value: data.user.branch.id } : {})
              },
              role: {
                ...fields.role,
                ...(data.user.role ? { value: data.user.role.id } : {})
              }
            }}
            graphql
            mutation={UPDATE_USER_MUTATION}
            buttonText="Save"
            extraVariables={{ id: props.userId }}
            refetchQueries={[
              { query: SINGLE_USER_QUERY, variables: { id: props.userId } }
            ]}
          />
        );
      }}
    </Query>
  );
};

export default CreateUserForm;
