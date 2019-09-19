import { useState, useEffect } from "react";
import Button from "./Button";
import InputField from "./Input/InputField";
import { Mutation } from "react-apollo";

const Form = ({ fields, method, graphql, mutation }) => {
  const [formFields, setFormFields] = useState(null);
  const [variables, setVariables] = useState(null);
  const handleFieldChange = async field => {
    setFormFields({
      ...formFields,
      [field.name]: { ...field }
    });

    setVariables({
      ...variables,
      [field.name]: field.value
    });
  };

  useEffect(() => {
    setFormFields(null);
  }, []);

  const handleGraphqlFormSubmit = async mutation => {
    const res = await mutation();
    console.log(res);
  };
  const handleFormSubmit = async mutation => {
    const res = await mutation();
  };

  const fieldsToRenders = Object.keys(fields).map((fieldKey, index) => {
    const fieldData = fields[fieldKey];
    return (
      <InputField
        key={fieldKey + index}
        type={fieldData.type}
        placeholder={fieldData.placeholder || ""}
        label={fieldData.label || upperCase(fieldKey)}
        icon={fieldData.icon}
        options={fieldData.options}
        change={handleFieldChange}
        name={fieldData.name || fieldKey}
      />
    );
  });

  const formToRender = graphql ? (
    <Mutation mutation={mutation} variables={variables}>
      {(formMutation, { error, loading, data }) => {
        return (
          <form method={method || "POST"} onSubmit={e => e.preventDefault()}>
            {fieldsToRenders}
            <Button
              fullWidth
              onClick={() => handleGraphqlFormSubmit(formMutation)}
            >
              Submit
            </Button>
          </form>
        );
      }}
    </Mutation>
  ) : (
    <form method={method || "POST"} onSubmit={e => e.preventDefault()}>
      {fieldsToRenders}
      <Button fullWidth onClick={handleFormSubmit}>
        Submit
      </Button>
    </form>
  );

  return formToRender;
};

const upperCase = string => string[0].toUpperCase() + string.slice(1);

export default Form;
