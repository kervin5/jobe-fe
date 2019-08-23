import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import JobMutationBaseForm from "./JobMutationBaseForm";
import Title from "../../common/UI/Title";

const CREATE_JOB_MUTATION = gql`
  mutation CREATE_JOB_MUTATION(
    $title: String!
    $description: String!
    $location: LocationCreateWithoutJobsInput!
    $categories: [String!]!
    $skills: [String!]!
    $qualifications: String!
    $requirements: String!
    $type: String!
    $minCompensation: Float!
    $maxCompensation: Float!
    $compensationType: String!
  ) {
    createJob(
      title: $title
      description: $description
      location: { create: $location }
      categories: $categories
      skills: $skills
      qualifications: $qualifications
      requirements: $requirements
      type: $type
      minCompensation: $minCompensation
      maxCompensation: $maxCompensation
      compensationType: $compensationType
    ) {
      title
      id
      location {
        name
      }
      description
      qualifications
      requirements
      type
      minCompensation
      maxCompensation
    }
  }
`;

const JobCreatorForm = props => {
  const [formData, setFormData] = useState({});

  return (
    <div>
      <Title size={props.smallTitle ? "m" : "l"}>Post a Job</Title>
      <p className={"Instructions"}>
        Please enter the information for the new job listing
      </p>
      <Mutation mutation={CREATE_JOB_MUTATION} variables={{ ...formData }}>
        {(createJobMutation, { error, loading, data }) => {
          if (error) return <p>Something went wrong</p>;
          if (loading) return <p>Processing</p>;
          return (
            <JobMutationBaseForm
              mutation={{
                execute: createJobMutation,
                setVariables: setFormData
              }}
            />
          );
        }}
      </Mutation>
    </div>
  );
};

export default JobCreatorForm;
