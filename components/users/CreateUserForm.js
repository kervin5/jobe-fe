import gql from "graphql-tag";
import Form from "../common/UI/Form";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($email: String, $name: String!) {
    createUser(name: $name, email: $email) {
      id
      email
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
      options: ["Woodland Hills"]
    },
    role: {
      type: "dropdown",
      placeholder: "Please select a role",
      options: ["Recruiter"]
    }
  };

  return <Form fields={fields} graphql mutation={CREATE_USER_MUTATION} />;
};

export default CreateUserForm;
