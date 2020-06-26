import React, { useEffect } from "react";
import { Mutation } from "react-apollo";
import ErrorMessage from "@/common/UI/ErrorMessage";
import gql from "graphql-tag";
import useForm from "react-hook-form";
import { Form, Button, Checkbox } from "semantic-ui-react";
import Router from "next/router";
import LocationInput from "@/common/UI/Input/CustomSemanticInput/LocationInput";
import DropdownGraphqlInput from "@/common/UI/Input/CustomSemanticInput/DropdownGraphqlInput";
import RichTextEditor from "@/common/UI/Input/CustomSemanticInput/RichTextEditor";
import TextArea from "@/common/UI/Input/CustomSemanticInput/TextArea";
import AuthorDropdown from "@/common/UI/Input/CustomSemanticInput/AuthorDropdown";
import Title from "@/common/UI/Title";
import InformationButton from "@/common/UI/InformationButton";

const CREATE_JOB_MUTATION = gql`
  mutation CREATE_JOB_MUTATION(
    $title: String!
    $description: String!
    $disclaimer: String
    $location: String!
    $categories: [String!]!
    $skills: [String!]!
    $perks: [String!]
    $type: String!
    $minCompensation: Float!
    $maxCompensation: Float
    $compensationType: String!
    $author: String
    $isRecurring: Boolean
  ) {
    createJob(
      title: $title
      description: $description
      disclaimer: $disclaimer
      location: $location
      categories: $categories
      skills: $skills
      perks: $perks
      type: $type
      minCompensation: $minCompensation
      maxCompensation: $maxCompensation
      compensationType: $compensationType
      author: $author
      isRecurring: $isRecurring
    ) {
      title
      id
      location {
        name
      }
      description
      type
      minCompensation
      maxCompensation
    }
  }
`;

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

const CreateJobForm = () => {
  const {
    register,
    errors,
    handleSubmit,
    setValue,
    triggerValidation
  } = useForm();

  useEffect(() => {
    register({ name: "jobTitle" }, { required: true });
    register({ name: "jobLocation" }, { required: true });
    register({ name: "jobMinCompensation" }, { required: true });
    register({ name: "jobMaxCompensation" });
    register({ name: "jobCompensationType" }, { required: true });
    register({ name: "jobCategories" }, { required: true });
    register({ name: "jobType" }, { required: true });
    register({ name: "jobSkills" }, { required: true });
    register({ name: "jobAuthor" });
    register({ name: "jobPerks" });
    register({ name: "jobDescription" }, { required: true });
    register({ name: "jobDisclaimer" });
    register({ name: "jobIsRecurring" });
  }, []);

  const onSubmit = async (data, createJobMutation, e) => {
    const variables = {
      title: data.jobTitle,
      description: data.jobDescription,
      location: data.jobLocation,
      categories: data.jobCategories,
      skills: data.jobSkills,
      type: data.jobType,
      minCompensation: parseFloat(data.jobMinCompensation),
      maxCompensation: parseFloat(data.jobMaxCompensation),
      compensationType: data.jobCompensationType,
      author: data.jobAuthor,
      disclaimer: data.jobDisclaimer,
      isRecurring: data.jobIsRecurring,
      perks: data.jobPerks
    };

    const {
      data: { createJob }
    } = await createJobMutation({ variables });
    if (createJob) {
      Router.push("/admin/jobs/preview/" + createJob.id);
    } else {
      console.log("Something failed");
    }
  };

  const handleInputChange = async (e, data) => {
    // console.log(data);
    if (data.type === "checkbox") {
      setValue(data.name, data.checked);
    } else {
      setValue(data.name, data.value);
    }
    await triggerValidation({ name: data.name });
  };

  // console.log(errors);

  return (
    <>
      <Title size={"l"}>Post a Job</Title>
      <p className={"Instructions"}>
        Please enter the information for the new job listing
      </p>
      <Mutation mutation={CREATE_JOB_MUTATION}>
        {(createJobMutation, { error, loading, data }) => {
          return (
            <Form
              onSubmit={handleSubmit((data, event) =>
                onSubmit(data, createJobMutation, event)
              )}
              size={"large"}
              loading={loading || !!data}
            >
              <ErrorMessage error={error} />
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
                  name="jobIsRecurring"
                  toggle
                  label="Recurring Job"
                  onChange={handleInputChange}
                />
                <InformationButton />
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
                  type="number"
                  step="0.01"
                />
                <Form.Input
                  name="jobMaxCompensation"
                  fluid
                  label="Maximum Compensation"
                  placeholder="20.99"
                  onChange={handleInputChange}
                  error={errors.jobMaxCompensation ? true : false}
                  type="number"
                  step="0.01"
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
                placeholder="Select all that apply"
                multiple
                graphql={{
                  query: `query ALL_CATEGORIES( $query: String! ) { categories(where: {name: {contains: $query}}) { id name } }`
                }}
                error={errors.jobCategories ? true : false}
              />

              <DropdownGraphqlInput
                onChange={handleInputChange}
                name="jobPerks"
                label="Job Perks"
                placeholder="Select all that apply"
                multiple
                graphql={{
                  query: `query ALL_PERKS( $query: String! ) { perks(where: {name: {contains: $query}} orderBy: {name: asc}) { id name } }`
                }}
                error={errors.jobPerks ? true : false}
                allowAdditions
                additionLabel="Create: "
                additionWarning="Any new perks will be reviewed and are subject to approval"
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
                  query: `query ALL_SKILLS( $query: String! ) { skills(where: {name: {contains: $query}} orderBy: {name: asc}) { id name } }`
                }}
                error={errors.jobSkills ? true : false}
              />

              <AuthorDropdown
                onChange={handleInputChange}
                name="jobAuthor"
                label="Job Author"
                placeholder="Select an option"
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
              <Button.Group widths="2">
                <Button
                  type="button"
                  size="big"
                  onClick={() => Router.push("/admin/dashboard")}
                >
                  Cancel
                </Button>
                <Button type="submit" size="big" positive>
                  Save and Preview
                </Button>
              </Button.Group>
            </Form>
          );
        }}
      </Mutation>
    </>
  );
};

export default CreateJobForm;
