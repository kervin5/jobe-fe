import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Form, Button, Loader, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/common/UI/ErrorMessage";
import DropdownGraphqlInput from "@/common/UI/Input/CustomInput/DropdownGraphqlInput";
import BranchesAccessPanel from "@/components/access/branches/BranchesAccessPanel";

import appText from "@/lang/appText";

////
import { SINGLE_USER_QUERY } from "@/graphql/queries/users";
import { UPDATE_USER_MUTATION } from "@/graphql/mutations/users";

const EditUserForm = ({ data, userId, refetchQueries }) => {
  const [updateUserMutation, mutationState] = useMutation(UPDATE_USER_MUTATION);
  useEffect(() => {
    register({ name: "name", value: data.name }, { required: true });
    register({ name: "email", value: data.email }, { required: true });

    register(
      {
        name: "branch",
        value: data.branch?.id,
      },
      { required: true }
    );

    register(
      {
        name: "role",
        value: data.role.id,
      },
      { required: true }
    );
  }, []);

  const { register, errors, handleSubmit, setValue } = useForm();

  const [touchedFields, setTouchedFields] = useState({});

  const onSubmit = async (data, e) => {
    e.preventDefault();
    await updateUserMutation({
      variables: { ...data, id: userId },
      refetchQueries,
    });
  };

  const handleInputChange = async (e, { name, value }, customField) => {
    setValue(name, value, { shouldValidate: true });
    setTouchedFields({ ...touchedFields, [name]: value });
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
            header={appText.messages.success}
            content={appText.messages.saved}
          />
        )}

        <Form.Input
          name="name"
          fluid
          label={appText.objects.name.singular}
          placeholder="Jhon Doe"
          onChange={handleInputChange}
          error={errors.name ? true : false}
          defaultValue={data.name}
        />

        <Form.Input
          name="email"
          fluid
          label={appText.objects.email.singular}
          placeholder="Warehouse Manager"
          onChange={handleInputChange}
          error={errors.email ? true : false}
          defaultValue={data.email}
          readOnly
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
          defaultValue={data.branch?.id}
        />

        <DropdownGraphqlInput
          onChange={handleInputChange}
          name="role"
          label={appText.objects.role.singular}
          placeholder={appText.messages.validation.select}
          graphql={{
            query: `query ROLES_QUERY {
              roles {
                id
                name
              }
            }`,
          }}
          error={errors.role ? true : false}
          defaultValue={data.role.id}
        />
        <BranchesAccessPanel
          userId={data.id}
          selected={[...data.otherBranches, { ...data.branch, primary: true }]}
          onChange={handleInputChange}
        />
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

const EditUserFormDetail = ({ userId, refetchQueries }) => {
  const { error, loading, data } = useQuery(SINGLE_USER_QUERY, {
    variables: { id: userId },
    fetchPolicy: "network-only",
  });

  if (error) return <ErrorMessage error={error} />;
  if (!data) return <Loader active inline="centered" />;
  return (
    <EditUserForm
      userId={userId}
      loading={loading}
      data={data.user}
      refetchQueries={refetchQueries}
    />
  );
};

export default EditUserFormDetail;
