import React, { useState } from "react";
import Button from "./Button";
import InputField from "./Input/InputField";
import { Query, Mutation } from "react-apollo";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Form = ({ fields, method, graphql, mutation }) => {
  const [formId, setFormId] = useState(generateFormId());
  const [formFields, setFomFields] = useState({ ...fields });
  const [variables, setVariables] = useState(null);
  const handleFieldChange = async field => {
    setVariables({
      ...variables,
      [field.name]: field.value
    });
  };

  const handleGraphqlFormSubmit = async mutation => {
    const res = await mutation();
    setVariables(null);
    setFomFields({ ...fields });
    setFormId(generateFormId());
  };

  const handleFormSubmit = async mutation => {
    const res = await mutation();
  };

  const fieldsToRenders = Object.keys(formFields).map((fieldKey, index) => {
    const fieldData = formFields[fieldKey];

    return fieldData.options && fieldData.options.hasOwnProperty("query") ? (
      <Query query={fieldData.options.query} key={fieldKey + index + formId}>
        {({ error, loading, data }) => {
          if (error) return <p>Something went wrong.</p>;
          if (loading) return <p>Loading...</p>;
          const options = data[Object.keys(data)[0]].map(option => {
            return fieldData.options.hasOwnProperty("label")
              ? {
                  label: option[fieldData.options.label],
                  value: option[fieldData.options.value]
                }
              : option[fieldData.options.value];
          });

          return (
            <InputField
              key={fieldKey + index + "FormField" + formId}
              type={fieldData.type}
              placeholder={fieldData.placeholder || ""}
              label={fieldData.label || upperCase(fieldKey)}
              icon={fieldData.icon}
              options={options}
              change={handleFieldChange}
              name={fieldData.name || fieldKey}
            />
          );
        }}
      </Query>
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
      />
    );
  });

  const formToRender = graphql ? (
    <Mutation mutation={mutation} variables={variables}>
      {(formMutation, { error, loading, data }) => {
        if (loading)
          return (
            <Segment>
              <Dimmer active inverted>
                <Loader size="large">Processing</Loader>
              </Dimmer>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Segment>
          );

        return (
          <form method={method || "POST"} onSubmit={e => e.preventDefault()}>
            {!loading && !error && data && <p>Success!</p>}
            {fieldsToRenders}
            <Button
              fullWidth
              onClick={() => handleGraphqlFormSubmit(formMutation)}
              disabled={loading}
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
const generateFormId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

export default React.memo(Form, (prevProps, nextProps) => {
  return true;
});
