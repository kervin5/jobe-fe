import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";

import Loader from "@/common/UI/Animated/Loader";
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
      <form
        onSubmit={handleSubmit((data, event) => onSubmit(touchedFields, event))}
        size={"large"}
        loading={mutationState.loading}
      >
        <ErrorMessage error={mutationState.error} />

        {mutationState.data && <p>{appText.messages.saved}</p>}

        <TextField
          name="name"
          variant="outlined"
          label={appText.objects.name.singular}
          placeholder="Jhon Doe"
          onChange={handleInputChange}
          error={errors.name ? true : false}
          defaultValue={data.name}
        />

        <TextField
          name="email"
          variant="outlined"
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
        <ButtonGroup>
          <Button type="submit" size="large" disabled={mutationState.loading}>
            {appText.actions.save}
          </Button>
        </ButtonGroup>
      </form>
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
