import React, { useEffect } from "react";
import { Mutation } from "@apollo/react-components";
import ErrorMessage from "@/common/UI/ErrorMessage";
import { gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Form, Button, Checkbox } from "semantic-ui-react";
import Router from "next/router";
import LocationInput from "@/common/UI/Input/CustomSemanticInput/LocationInput";
import DropdownGraphqlInput from "@/common/UI/Input/CustomSemanticInput/DropdownGraphqlInput";
import RichTextEditor from "@/common/UI/Input/CustomSemanticInput/RichTextEditor";
import TextArea from "@/common/UI/Input/CustomSemanticInput/TextArea";
import AuthorDropdown from "@/common/UI/Input/CustomSemanticInput/AuthorDropdown";
import Title from "@/common/UI/Title";
import InformationButton from "@/common/UI/InformationButton";
import appText from "@/lang/appText";

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

export const compensationTypeOptions = [
  {
    key: "hourly",
    text: appText.adjectives.hourly,
    value: appText.adjectives.hourly,
  },
  {
    key: "salary",
    text: appText.adjectives.salary,
    value: appText.adjectives.salary,
  },
  { key: "doe", text: appText.adjectives.doe, value: appText.adjectives.doe },
];

export const jobTypeOptions = [
  {
    key: "fulltime",
    text: appText.adjectives.fullTime,
    value: appText.adjectives.fullTime,
  },
  {
    key: "parttime",
    text: appText.adjectives.partTime,
    value: appText.adjectives.partTime,
  },
  {
    key: "temp",
    text: appText.adjectives.temp,
    value: appText.adjectives.temp,
  },
  {
    key: "perdiem",
    text: appText.adjectives.perDiem,
    value: appText.adjectives.perDiem,
  },
];

const CreateJobForm = () => {
  const { register, errors, handleSubmit, setValue } = useForm();

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
    register(
      { name: "jobPerks" },
      {
        validate: (value) =>
          validateMinSelectedOptions(value, 3, appText.objects.perk.plural),
      }
    );
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
      perks: data.jobPerks,
    };

    const {
      data: { createJob },
    } = await createJobMutation({ variables });
    if (createJob) {
      Router.push("/admin/jobs/" + createJob.id);
    } else {
      console.log("Something failed");
    }
  };

  const handleInputChange = async (e, data) => {
    // console.log(data);
    if (data.type === "checkbox") {
      setValue(data.name, data.checked, { shouldValidate: true });
    } else {
      setValue(data.name, data.value, { shouldValidate: true });
    }
  };

  return (
    <>
      <Title size={"l"} capitalize>
        {appText.messages.job.post}
      </Title>
      <p className={"Instructions"}>{appText.messages.job.postInstructions}</p>
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
                label={appText.messages.job.jobTitle}
                placeholder="Gerente de Ventas"
                onChange={handleInputChange}
                error={!!errors.jobTitle}
              />
              <div className="field">
                <Checkbox
                  name="jobIsRecurring"
                  toggle
                  label={appText.messages.job.jobRecurring}
                  onChange={handleInputChange}
                />
                <InformationButton
                  title={appText.messages.attention}
                  message={appText.messages.job.byEnablingRecurring}
                />
              </div>

              <LocationInput
                name="jobLocation"
                onChange={handleInputChange}
                error={errors.jobLocation}
                label={appText.objects.location.singular}
              />
              <Form.Group widths="equal">
                <Form.Input
                  name="jobMinCompensation"
                  fluid
                  label={appText.messages.job.jobMinCompensation}
                  placeholder="10.99"
                  onChange={handleInputChange}
                  error={errors.jobMinCompensation ? true : false}
                  type="number"
                  step="0.01"
                />
                <Form.Input
                  name="jobMaxCompensation"
                  fluid
                  label={appText.messages.job.jobMaxCompensation}
                  placeholder="20.99"
                  onChange={handleInputChange}
                  error={errors.jobMaxCompensation ? true : false}
                  type="number"
                  step="0.01"
                />
                <Form.Select
                  name="jobCompensationType"
                  options={compensationTypeOptions}
                  label={appText.messages.job.jobCompensationType}
                  placeholder={appText.messages.validation.select}
                  onChange={handleInputChange}
                  error={errors.jobCompensationType ? true : false}
                />
              </Form.Group>

              <DropdownGraphqlInput
                onChange={handleInputChange}
                name="jobCategories"
                label={appText.messages.job.jobCategories}
                placeholder={appText.messages.validation.selectAllThatApply}
                multiple
                graphql={{
                  query: `query ALL_CATEGORIES( $query: String! ) { categories(where: {name: {contains: $query}}) { id name } }`,
                }}
                error={errors.jobCategories}
              />

              <DropdownGraphqlInput
                onChange={handleInputChange}
                name="jobPerks"
                label={appText.messages.job.jobPerks}
                placeholder={appText.messages.validation.selectAllThatApply}
                multiple
                graphql={{
                  query: `query ALL_PERKS( $query: String! ) { perks(where: {name: {contains: $query}} orderBy: {name: asc}) { id name } }`,
                }}
                error={errors.jobPerks}
                allowAdditions
                additionLabel={`${appText.actions.create}: `}
                additionWarning={appText.messages.perk.approval}
              />
              <Form.Select
                name="jobType"
                options={jobTypeOptions}
                label={appText.messages.job.jobType}
                placeholder={appText.messages.validation.select}
                onChange={handleInputChange}
                error={!!errors.jobType}
              />

              <DropdownGraphqlInput
                onChange={handleInputChange}
                name="jobSkills"
                label={appText.messages.job.jobSkills}
                placeholder={
                  appText.messages.validation.selectAtLeastOne +
                  " " +
                  appText.objects.skill.singular
                }
                multiple
                graphql={{
                  query: `query ALL_SKILLS( $query: String! ) { skills(where: {name: {contains: $query}} orderBy: {name: asc}) { id name } }`,
                }}
                error={errors.jobSkills}
              />

              <AuthorDropdown
                onChange={handleInputChange}
                name="jobAuthor"
                label={appText.messages.job.jobAuthor}
                placeholder={appText.messages.validation.select}
                error={errors.jobAuthor}
              />

              <RichTextEditor
                name="jobDescription"
                onChange={handleInputChange}
                label={
                  <>
                    {appText.messages.job.jobDescription}
                    <InformationButton
                      title={appText.messages.attention}
                      message={appText.messages.job.jobDescriptionTips}
                    />
                  </>
                }
                error={errors.jobDescription ? true : false}
              />

              <TextArea
                placeholder={appText.messages.disclaimer.leaveEmpty}
                label={appText.messages.job.jobDisclaimer}
                name={"jobDisclaimer"}
                onChange={handleInputChange}
                error={errors.jobDisclaimer ? true : false}
              />
              <Button.Group widths="2">
                <Button
                  type="button"
                  size="big"
                  onClick={() => Router.push("/admin/jobs")}
                >
                  {appText.actions.cancel}
                </Button>
                <Button type="submit" size="big" positive>
                  {appText.actions.save} {appText.prepositions.and}{" "}
                  {appText.actions.preview}
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

export function validateMinSelectedOptions(
  selectedOptions,
  minOptions,
  optionType = appText.objects.option.plural
) {
  return (
    selectedOptions?.length >= minOptions ||
    appText.messages.validation.selectAtLeast(minOptions, optionType)
  );
}
