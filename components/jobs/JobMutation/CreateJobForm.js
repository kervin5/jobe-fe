import React, { useEffect } from "react";
import { Form, Button, Dropdown, Checkbox } from "semantic-ui-react";
import LocationInput from "../../common/UI/Input/CustomSemanticInput/LocationInput";
import DropdownGraphqlInput from "../../common/UI/Input/CustomSemanticInput/DropdownGraphqlInput";
import RichTextEditor from "../../common/UI/Input/CustomSemanticInput/RichTextEditor";
import TextArea from "../../common/UI/Input/CustomSemanticInput/TextArea";
import useForm from "react-hook-form";

const compensationTypeOptions = [
  { key: "hourly", text: "Hourly", value: "Hourly" },
  { key: "salary", text: "Salary", value: "Salary" },
  { key: "doe", text: "DOE", value: "DOE" }
];

const jobTypeOptions = [
  { key: "fulltime", text: "Full-Time", value: "Full-Time" },
  { key: "parttime", text: "Part-Time", value: "Part-Time" },
  { key: "temp", text: "Temp", value: "Temp" },
  { key: "perdiem", text: "Per Diem", value: "Per Diem" }
];

const FormExampleFieldError = () => {
  useEffect(() => {
    register({ name: "jobTitle" }, { required: true });
    register({ name: "jobLocation" }, { required: true });
    register({ name: "jobMinCompensation" }, { required: true });
    register({ name: "jobMaxCompensation" }, { required: true });
    register({ name: "jobCompensationType" }, { required: true });
    register({ name: "jobCategories" }, { required: true });
    register({ name: "jobType" }, { required: true });
    register({ name: "jobSkills" }, { required: true });
    register({ name: "jobAuthor" }, { required: true });
    register({ name: "jobDescription" }, { required: true });
    register({ name: "jobDisclaimer" }, { required: true });
    register({ name: "jobIsRecurring" });
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

  const handleInputChange = async (e, { name, value }) => {
    setValue(name, value);
    await triggerValidation({ name });
  };

  console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} size={"large"}>
      <Form.Input
        name="jobTitle"
        fluid
        label="Job Title"
        placeholder="Warehouse Manager"
        onChange={handleInputChange}
        error={errors.jobTitle ? true : false}
      />
      <div className="field">
        <Checkbox
          toggle
          label="Recurring Job"
          onChange={handleInputChange}
          error={errors.jobIsRecurring ? "true" : "false"}
          name="jobIsRecurring"
        />
      </div>

      <LocationInput
        name="jobLocation"
        onChange={handleInputChange}
        error={errors.jobLocation ? true : false}
      />
      <Form.Group widths="equal">
        <Form.Input
          name="jobMinCompensation"
          fluid
          label="Minimum Compensation"
          placeholder="10.99"
          onChange={handleInputChange}
          error={errors.jobMinCompensation ? true : false}
        />
        <Form.Input
          name="jobMaxCompensation"
          fluid
          label="Maximum Compensation"
          placeholder="20.99"
          onChange={handleInputChange}
          error={errors.jobMaxCompensation ? true : false}
        />
        <Form.Select
          name="jobCompensationType"
          options={compensationTypeOptions}
          label="Compensation Type"
          placeholder="Select an option"
          onChange={handleInputChange}
          error={errors.jobCompensationType ? true : false}
        />
      </Form.Group>

      <DropdownGraphqlInput
        onChange={handleInputChange}
        name="jobCategories"
        label="Job Categories"
        placeholder="Select a category"
        multiple
        graphql={{
          query: `query ALL_CATEGORIES( $query: String! ) { categories(where: {name_contains: $query}) { id name } }`
        }}
        error={errors.jobCategories ? true : false}
      />
      <Form.Select
        name="jobType"
        options={jobTypeOptions}
        label="Job Type"
        placeholder="Select an option"
        onChange={handleInputChange}
        error={errors.jobType ? true : false}
      />

      <DropdownGraphqlInput
        onChange={handleInputChange}
        name="jobSkills"
        label="Job Skills"
        placeholder="Select at least one skill"
        multiple
        graphql={{
          query: `query ALL_SKILLS( $query: String! ) { skills(where: {name_contains: $query} orderBy: name_ASC) { id name } }`
        }}
        error={errors.jobSkills ? true : false}
      />

      <DropdownGraphqlInput
        onChange={handleInputChange}
        name="jobAuthor"
        label="Job Author"
        placeholder="Select an option"
        graphql={{
          query: `query ALL_AUTHORS( $query: String! ) { 
    users(where: { AND: [{role: { name_not: "candidate" }},{name_contains: $query}] }, orderBy: name_ASC) {
      id
      email
      name
    }
  } `
        }}
        error={errors.jobAuthor ? true : false}
      />

      <RichTextEditor
        name="jobDescription"
        onChange={handleInputChange}
        label="Job Description"
        error={errors.jobDescription ? true : false}
      />

      <TextArea
        placeholder="Leave empty if you want use default disclaimer"
        label="Job Disclaimer"
        name={"jobDisclaimer"}
        onChange={handleInputChange}
        error={errors.jobDisclaimer ? true : false}
      />
      <Button type="submit">Save Job</Button>
    </Form>
  );
};

export default FormExampleFieldError;
