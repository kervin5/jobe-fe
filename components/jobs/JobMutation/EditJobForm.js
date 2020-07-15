import React, { useEffect, useState } from "react";
import { Mutation, Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { Form, Button, Loader } from "semantic-ui-react";
import useForm from "react-hook-form";
import Router from "next/router";
import ErrorMessage from "@/common/UI/ErrorMessage";
import LocationInput from "@/common/UI/Input/CustomSemanticInput/LocationInput";
import DropdownGraphqlInput from "@/common/UI/Input/CustomSemanticInput/DropdownGraphqlInput";
import RichTextEditor from "@/common/UI/Input/CustomSemanticInput/RichTextEditor";
import TextArea from "@/common/UI/Input/CustomSemanticInput/TextArea";
import AuthorDropdown from "@/common/UI/Input/CustomSemanticInput/AuthorDropdown";
import Title from "@/common/UI/Title";
import CronJobToggle from "@/components/jobs/JobMutation/CronJobToggle";
import appText from "@/lang/appText";

const SINGLE_JOB_ALL_DATA_QUERY = gql`
  query SINGLE_JOB_ALL_DATA_QUERY($id: String!) {
    job(where: { id: $id }) {
      id
      title
      description
      disclaimer
      minCompensation
      maxCompensation
      compensationType
      type
      author {
        id
        email
      }
      skills {
        id
        name
      }
      perks {
        id
        name
      }
      categories {
        id
        name
      }
      createdAt
      location {
        id
        name
        latitude
        longitude
      }
    }
  }
`;

const UPDATE_JOB_MUTATION = gql`
  mutation UPDATE_JOB_MUTATION(
    $jobId: String!
    $title: String
    $description: String
    $disclaimer: String
    $type: String
    $compensationType: String
    $maxCompensation: Float
    $minCompensation: Float
    $location: String
    $categories: [String!]
    $skills: [String!]
    $perks: [String!]
    $author: String
  ) {
    updateJob(
      where: { id: $jobId }

      data: {
        title: $title
        compensationType: $compensationType
        description: $description
        disclaimer: $disclaimer
        type: $type
        maxCompensation: $maxCompensation
        minCompensation: $minCompensation
        location: $location
        categories: $categories
        skills: $skills
        perks: $perks
        author: $author
      }
    ) {
      id
      title
    }
  }
`;

const compensationTypeOptions = [
  { key: "hourly", text: "Hourly", value: "Hourly" },
  { key: "salary", text: "Salary", value: "Salary" },
  { key: "doe", text: "DOE", value: "DOE" },
];

const jobTypeOptions = [
  { key: "fulltime", text: "Full-Time", value: "Full-Time" },
  { key: "parttime", text: "Part-Time", value: "Part-Time" },
  { key: "temp", text: "Temp", value: "Temp" },
  { key: "perdiem", text: "Per Diem", value: "Per Diem" },
];

const EditJobForm = ({ data, jobId }) => {
  useEffect(() => {
    register({ name: "jobTitle", value: data.title }, { required: true });
    register(
      { name: "jobLocation", value: data.location.name },
      { required: true }
    );
    register(
      { name: "jobMinCompensation", value: data.minCompensation },
      { required: true }
    );
    register({ name: "jobMaxCompensation", value: data.maxCompensation });
    register(
      { name: "jobCompensationType", value: data.compensationType },
      { required: true }
    );
    register(
      {
        name: "jobCategories",
        value: data.categories.map((category) => category.id),
      },
      { required: true }
    );
    register({ name: "jobType", value: data.type }, { required: true });
    register(
      { name: "jobSkills", value: data.skills.map((skill) => skill.id) },
      { required: true }
    );
    register(
      { name: "jobPerkss", value: data.perks.map((perk) => perk.id) },
      { required: true }
    );
    register({ name: "jobAuthor", value: data.author.id });
    register(
      { name: "jobDescription", value: data.description },
      { required: true }
    );
    register({ name: "jobDisclaimer", value: data.disclaimer });
    // register({ name: "jobIsRecurring" });
  }, []);

  const {
    register,
    errors,
    handleSubmit,
    setValue,
    triggerValidation,
  } = useForm();

  const [touchedFields, setTouchedFields] = useState({});

  const onSubmit = async (data, updateJobMutation, e) => {
    let variables = {};

    for (let field in data) {
      const fieldName = field.split("job")[1];
      const variableName =
        fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
      variables[variableName] = data[field];
    }

    if (variables.minCompensation) {
      variables.minCompensation = parseFloat(variables.minCompensation);
    }

    if (variables.maxCompensation) {
      variables.maxCompensation = parseFloat(variables.maxCompensation);
    }

    const {
      data: { updateJob },
    } = await updateJobMutation({ variables: { ...variables, jobId } });

    if (updateJob) {
      Router.push("/admin/jobs/" + updateJob.id);
    }
  };

  const handleInputChange = async (e, { name, value }) => {
    setValue(name, value);
    setTouchedFields({ ...touchedFields, [name]: value });
    await triggerValidation({ name });
  };

  return (
    <>
      <Title size={"l"} capitalize>
        {appText.actions.edit} {appText.objects.job.singular}
      </Title>
      <p className={"Instructions"}>{appText.messages.job.postInstructions}</p>
      <Mutation mutation={UPDATE_JOB_MUTATION}>
        {(updateJobMutation, mutationState) => {
          return (
            <Form
              onSubmit={handleSubmit((data, event) =>
                onSubmit(touchedFields, updateJobMutation, event)
              )}
              size={"large"}
              loading={mutationState.loading || !!mutationState.data}
            >
              <ErrorMessage error={mutationState.error} />
              <Form.Input
                name="jobTitle"
                fluid
                label={appText.messages.job.jobTitle}
                placeholder="Gerente de Ventas"
                onChange={handleInputChange}
                error={errors.jobTitle ? true : false}
                defaultValue={data.title}
              />

              <CronJobToggle jobId={jobId} />

              <LocationInput
                name="jobLocation"
                onChange={handleInputChange}
                error={errors.jobLocation ? true : false}
                defaultValue={data.location.name}
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
                  defaultValue={data.minCompensation}
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
                  defaultValue={data.maxCompensation}
                  step="0.01"
                />
                <Form.Select
                  name="jobCompensationType"
                  options={compensationTypeOptions}
                  label={appText.messages.job.jobCompensationType}
                  placeholder={appText.messages.validation.select}
                  onChange={handleInputChange}
                  error={errors.jobCompensationType ? true : false}
                  defaultValue={data.compensationType}
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
                error={errors.jobCategories ? true : false}
                defaultValue={data.categories.map((category) => category.id)}
              />
              <Form.Select
                name="jobType"
                options={jobTypeOptions}
                label={appText.messages.job.jobType}
                placeholder={appText.messages.validation.select}
                onChange={handleInputChange}
                error={errors.jobType ? true : false}
                defaultValue={data.type}
              />

              <DropdownGraphqlInput
                onChange={handleInputChange}
                name="jobSkills"
                label={appText.messages.job.jobSkills}
                placeholder={appText.messages.validation.selectAtLeastOne}
                multiple
                graphql={{
                  query: `query ALL_SKILLS( $query: String! ) { skills(where: {name: {contains: $query}} orderBy: {name: asc}) { id name } }`,
                }}
                error={errors.jobSkills ? true : false}
                defaultValue={data.skills.map((skill) => skill.id)}
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
                error={errors.jobPerks ? true : false}
                defaultValue={data.perks.map((perk) => perk.id)}
                allowAdditions
                additionLabel={`${appText.actions.create}: `}
                additionWarning={appText.messages.perk.approval}
              />

              <AuthorDropdown
                onChange={handleInputChange}
                name="jobAuthor"
                label={appText.messages.job.jobAuthor}
                placeholder={appText.messages.validation.select}
                error={errors.jobAuthor ? true : false}
                defaultValue={data.author.id}
              />

              <RichTextEditor
                name="jobDescription"
                onChange={handleInputChange}
                label={appText.messages.job.jobDescription}
                error={errors.jobDescription ? true : false}
                defaultValue={data.description}
              />

              <TextArea
                placeholder={appText.messages.disclaimer.leaveEmpty}
                label={appText.messages.job.jobDisclaimer}
                name={"jobDisclaimer"}
                onChange={handleInputChange}
                error={errors.jobDisclaimer ? true : false}
                defaultValue={data.disclaimer}
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

const EditJobFormDetail = ({ jobId }) => {
  return (
    <Query query={SINGLE_JOB_ALL_DATA_QUERY} variables={{ id: jobId }}>
      {({ error, loading, data }) => {
        if (error) return <ErrorMessage error={error} />;
        if (!data) return <Loader active inline="centered" />;
        return <EditJobForm jobId={jobId} loading={loading} data={data.job} />;
      }}
    </Query>
  );
};

export default EditJobFormDetail;
