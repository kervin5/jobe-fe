import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";

import { useForm } from "react-hook-form";
import ErrorMessage from "@/common/UI/ErrorMessage";
import DropdownGraphqlInput from "@/common/UI/Input/CustomInput/DropdownGraphqlInput";
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

  const { register, errors, handleSubmit, setValue } = useForm();

  const [touchedFields, setTouchedFields] = useState({});

  const onSubmit = async (data, e) => {
    e.preventDefault();
    await updateUserMutation({
      variables: { ...data },
    });
    
  };

  const handleInputChange = async ({ target: { name, value}}) => {
    // console.log({name, value});
    setValue(name, value, { shouldValidate: true });
    setTouchedFields({ ...touchedFields, [name]: value });
  };

  console.log({errors});
  return (
    <>
      <form
        onSubmit={handleSubmit((data, event) => onSubmit(touchedFields, event))}
        aria-disabled={mutationState.loading}
      >
        <ErrorMessage error={mutationState.error} />

        {mutationState.data && <p>El usuario fue creado exitosamente</p>}

        <TextField
          name="name"
          variant="outlined"
          label={appText.objects.name.singular}
          placeholder="Jhon Doe"
          onChange={handleInputChange}
          error={errors.name ? true : false}
        />

        <TextField
          name="email"
          variant="outlined"
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
        <ButtonGroup>
          <Button type="submit" size="large" disabled={mutationState.loading}>
            {appText.actions.save}
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export default CreatUserForm;
