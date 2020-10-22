import React, { useState } from "react";
import Button from "./Button";
import InputField from "./Input/InputField";
import { useQuery, useMutation } from "@apollo/client";
import Loader from "@/common/UI/Animated/Loader";
import { gql } from "@apollo/client";

const defaultMutation = gql`
  mutation INCREMENT_JOB_VIEW_COUNT_MUTATION($id: String!) {
    incrementJobViewCount(id: $id) {
      id
      views
    }
  }
`;

const Form = ({
  fields,
  method,
  graphql,
  mutation,
  buttonText,
  onSubmit,
  extraVariables,
  refetchQueries,
}) => {
  const [formId, setFormId] = useState(generateFormId());
  const [formFields, setFomFields] = useState({ ...fields });
  const [variables, setVariables] = useState(null);

  const [formMutation, { error, loading, data }] = useMutation(
    mutation ?? defaultMutation,
    {
      variables: { ...variables, ...extraVariables },
      refetchQueries,
    }
  );
  const handleFieldChange = async (field) => {
    if (!field.disabled) {
      setVariables({
        ...variables,
        [field.name]: field.value,
      });
    }
  };

  const handleGraphqlFormSubmit = async (mutation) => {
    const res = await mutation();
    setVariables(null);
    setFomFields({ ...fields });
    setFormId(generateFormId());
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    onSubmit(variables);
  };

  const fieldsToRenders = Object.keys(formFields).map((fieldKey, index) => {
    const fieldData = formFields[fieldKey];
    return fieldData.options && fieldData.options.hasOwnProperty("query") ? (
      <InputFieldWithGraphQL
        key={fieldKey + index + "FormField" + formId}
        fieldData={fieldData}
        fieldKey={fieldKey}
        onChange={handleFieldChange}
        formId={formId}
      />
    ) : (
      <InputField
        key={fieldKey + index + "FormField" + formId}
        type={fieldData.type}
        placeholder={fieldData.placeholder || ""}
        label={fieldData.label || upperCase(fieldKey)}
        icon={fieldData.icon}
        options={fieldData.options}
        change={handleFieldChange}
        name={fieldData.name || fieldKey}
        value={fieldData.value}
        disabled={fieldData.disabled}
      />
    );
  });

  const formToRender = graphql ? (
    loading ? (
      <Loader />
    ) : (
      <form method={method || "POST"} onSubmit={(e) => e.preventDefault()}>
        {!loading && !error && data && <p>Success!</p>}
        {fieldsToRenders}
        <Button
          fullWidth
          onClick={() => handleGraphqlFormSubmit(formMutation)}
          disabled={loading}
        >
          {buttonText || "Submit"}
        </Button>
      </form>
    )
  ) : (
    <form method={method || "POST"} onSubmit={(e) => e.preventDefault()}>
      {fieldsToRenders}
      <Button fullWidth onClick={handleFormSubmit}>
        {buttonText || "Submit"}
      </Button>
    </form>
  );

  return formToRender;
};

function InputFieldWithGraphQL({ fieldData, fieldKey, onChange, formId }) {
  const { error, loading, data } = useQuery(fieldData.options.query);

  if (error) return <p>Something went wrong.</p>;
  if (loading) return <p>Loading...</p>;
  const options = data[Object.keys(data)[0]].map((option) => {
    return fieldData.options.hasOwnProperty("label")
      ? {
          label: option[fieldData.options.label],
          value: option[fieldData.options.value],
        }
      : option[fieldData.options.value];
  });

  return (
    <InputField
      key={fieldKey + "FormField" + formId}
      type={fieldData.type}
      placeholder={fieldData.placeholder || ""}
      label={fieldData.label || upperCase(fieldKey)}
      icon={fieldData.icon}
      options={options}
      change={onChange}
      name={fieldData.name || fieldKey}
      value={fieldData.value}
      disabled={fieldData.disabled}
    />
  );
}

const upperCase = (string) => string[0].toUpperCase() + string.slice(1);
const generateFormId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

export default Form;
