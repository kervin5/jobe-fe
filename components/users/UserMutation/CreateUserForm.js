import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button, Loader, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/common/UI/ErrorMessage";
import DropdownGraphqlInput from "@/common/UI/Input/CustomSemanticInput/DropdownGraphqlInput";
import BranchesAccessPanel from "@/components/access/branches/BranchesAccessPanel";

import appText from "@/lang/appText";

import { CREATE_USER_MUTATION } from "@/graphql/mutations/users";

const CreatUserForm = () => {
  const [updateUserMutation, mutationState] = useMutation(CREATE_USER_MUTATION);
  useEffect(() => {
    register({ name: "name" }, { required: true });
    register({ name: "email" }, { required: true });
    register({ name: "branch" }, { required: true });
    register({ name: "role" }, { required: true });
  }, []);

  const {
    register,
    errors,
    handleSubmit,
    setValue,
    triggerValidation,
  } = useForm();

  const [touchedFields, setTouchedFields] = useState({});

  const onSubmit = async (data, e) => {
    e.preventDefault();
    await updateUserMutation({
      variables: { ...data },
    });
  };

  const handleInputChange = async (e, { name, value }, customField) => {
    setValue(name, value);
    setTouchedFields({ ...touchedFields, [name]: value });
    if (!customField) {
      await triggerValidation({ name });
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit((data, event) => onSubmit(touchedFields, event))}
        size={"large"}
        loading={mutationState.loading}
      >
        <ErrorMessage error={mutationState.error} />

        {mutationState.data && (
          <Message
            color="green"
            header="Success"
            content="The user was created"
          />
        )}

        <Form.Input
          name="name"
          fluid
          label={appText.objects.name.singular}
          placeholder="Jhon Doe"
          onChange={handleInputChange}
          error={errors.name ? true : false}
        />

        <Form.Input
          name="email"
          fluid
          label={appText.objects.email.singular}
          placeholder="Warehouse Manager"
          onChange={handleInputChange}
          error={errors.email ? true : false}
        />

        <DropdownGraphqlInput
          onChange={handleInputChange}
          name="branch"
          label={appText.objects.branch.singular}
          placeholder={appText.messages.validation.select}
          graphql={{
            query: `query BRANCHES_QUERY {
              branches {
                id
                name
              }
            }`,
          }}
          error={errors.branch ? true : false}
        />

        <DropdownGraphqlInput
          onChange={handleInputChange}
          name="role"
          label={appText.objects.role.singular}
          placeholder={appText.messages.validation.select}
          graphql={{
            query: `  query ROLES_QUERY {
              roles {
                id
                name
              }
            }`,
          }}
          error={errors.role ? true : false}
        />
        <BranchesAccessPanel selected={[]} onChange={handleInputChange} />
        <Button.Group widths="2">
          {/* <Button
            type="button"
            size="big"
            onClick={() => Router.push("/admin/jobs")}
          >
            {appText.actions.cancel}
          </Button> */}
          <Button
            type="submit"
            size="big"
            positive
            loading={mutationState.loading}
            disabled={mutationState.loading}
          >
            {appText.actions.save}
          </Button>
        </Button.Group>
      </Form>
    </>
  );
};

export default CreatUserForm;
