import React, { useEffect } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import useForm from "react-hook-form";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" }
];

const FormExampleFieldError = () => {
  useEffect(() => {
    register({ name: "firstName" }, { required: true });
    register({ name: "lastName" }, { required: true });
    register({ name: "genderSelect" }, { required: true });
    register({ name: "checkBox" }, { required: true });
    register({ name: "NoteContent" }, { required: true });
  }, []);

  const {
    register,
    errors,
    handleSubmit,
    setValue,
    triggerValidation
  } = useForm();
  const onSubmit = (data, e) => {
    console.log("Submit event", e);
    alert(JSON.stringify(data));
  };

  console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        placeholder="Add Note"
        name="NoteContent"
        fluid
        style={{ minHeight: 100 }}
        onChange={async (e, { name, value }) => {
          setValue(name, value);
          await triggerValidation({ name });
        }}
        error={errors.NoteContent ? true : false}
      />
      <Form.Group widths="equal">
        <Form.Input
          name="firstName"
          fluid
          label="First name"
          placeholder="First name"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await triggerValidation({ name });
          }}
          error={errors.firstName ? true : false}
        />
        <Form.Input
          name="lastName"
          fluid
          label="Last name"
          placeholder="Last name"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await triggerValidation({ name });
          }}
          error={errors.lastName ? true : false}
        />
      </Form.Group>
      <Form.Select
        name="genderSelect"
        options={options}
        placeholder="Gender"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
          await triggerValidation({ name });
        }}
        error={errors.genderSelect ? true : false}
      />
      <Form.Checkbox
        name="checkBox"
        label="I agree to the Terms and Conditions"
        onChange={async (e, { name, checked }) => {
          setValue(name, checked);
          await triggerValidation({ name });
        }}
        error={errors.checkBox ? true : false}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default FormExampleFieldError;
